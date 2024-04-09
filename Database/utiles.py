# myapp/utils.py

from django.contrib.auth.models import *
from rest_framework import viewsets
from Database.models import *
from .serializers import *



class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

class Pre_pro_audioViewSet(viewsets.ModelViewSet):
    queryset = Pre_pro_audio.objects.all()
    serializer_class = Pre_pro_audioSerializer

class Enhanced_audioViewSet(viewsets.ModelViewSet):
    queryset = Enhanced_audio.objects.all()
    serializer_class = Enhanced_audioSerializer

