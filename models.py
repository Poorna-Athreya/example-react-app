from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import re

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
                message="Invalid email format"
            )
        ]
    )
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[\w.@+-]+$',
                message="Username may contain only letters, numbers, and @/./+/-/_ characters."
            )
        ]
    )
    # Password field will use AbstractBaseUser's hashing and management features
    password = models.CharField(
        max_length=128,
        validators=[MinLengthValidator(8)]
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def clean(self):
        # Email uniqueness is already managed at the database level, but optionally you can programmatically check for it here
        if re.match(r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', self.email) is None:
            raise ValidationError("Invalid email format")
        if len(self.password) < 8:
            raise ValidationError("Password must be at least 8 characters long")

        # Ensure that the email is unique
        if User.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError("A user with this email already exists.")
        # Ensure that the username is unique
        if User.objects.filter(username=self.username).exclude(pk=self.pk).exists():
            raise ValidationError("A user with this username already exists.")
