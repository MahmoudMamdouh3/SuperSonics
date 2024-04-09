# myapp/views.py

from rest_framework import viewsets
from .models import *
from .serializers import *
from .utiles import *
from django.shortcuts import render


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = Account.objects.all()
#     serializer_class = UserSerializer

