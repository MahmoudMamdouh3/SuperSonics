# backends.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from .models import account

class AccountBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = account.objects.get(username=username)
            if user.password == password:  # Directly compare the passwords
                return user
        except account.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return account.objects.get(pk=user_id)
        except account.DoesNotExist:
            return None