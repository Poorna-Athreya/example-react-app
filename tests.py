import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

class UserRegistrationTests(APITestCase):
    def setUp(self):
        self.valid_payload = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'strongPassword123'
        }
        self.invalid_payload_email = {
            'email': 'invalid-email',
            'username': 'testuser',
            'password': 'strongPassword123'
        }
        self.invalid_payload_password = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'short'
        }

    def test_register_user_valid_payload(self):
        response = self.client.post(
            reverse('registration_endpoint'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().email, 'test@example.com')

    def test_register_user_invalid_email(self):
        response = self.client.post(
            reverse('registration_endpoint'),
            data=json.dumps(self.invalid_payload_email),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)
    
    def test_register_user_invalid_password(self):
        response = self.client.post(
            reverse('registration_endpoint'),
            data=json.dumps(self.invalid_payload_password),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)
    
    def test_register_user_duplicate_email(self):
        self.client.post(
            reverse('registration_endpoint'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        response = self.client.post(
            reverse('registration_endpoint'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
