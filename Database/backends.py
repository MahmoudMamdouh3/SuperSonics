# backends.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from .models import account
from django.contrib.auth import get_user_model

User = get_user_model()

class AccountBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None