# views.py

from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from .models import User
from .serializers import UserSerializer
from .services.email import send_email

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            username = data.get('username')
            password = data.get('password')

            # Validate email format
            try:
                validate_email(email)
            except ValidationError as e:
                return JsonResponse({'error': 'Invalid email format'}, status=400)

            # Check if email is unique
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            # Validate password length
            if len(password) < 8:
                return JsonResponse({'error': 'Password must be at least 8 characters long'}, status=400)

            # Hash the password
            hashed_password = make_password(password)

            # Create the user
            user = User(email=email, username=username, password=hashed_password)
            user.save()

            # Send confirmation email
            send_confirmation_email(user)

            user_serializer = UserSerializer(user)
            return JsonResponse(user_serializer.data, status=201)

        except (KeyError, json.JSONDecodeError) as e:
            return JsonResponse({'error': 'Invalid input'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return HttpResponseBadRequest('Only POST requests are allowed')

def send_confirmation_email(user):
    subject = 'Welcome to Our Platform'
    message = f'Hi {user.username},\n\nThank you for registering. Please confirm your email address.'
    recipient_list = [user.email]
    
    # Leveraging send_email service to send the email
    send_email(subject, message, recipient_list)
