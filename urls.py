from django.urls import path
from backend import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
]
