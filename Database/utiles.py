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

class upscaled_audioViewSet(viewsets.ModelViewSet):
    queryset = upscaled_audio.objects.all()
    serializer_class = upscaled_audioSerializer

class RVC_AudioViewSet(viewsets.ModelViewSet):
    queryset = RVC_Audio.objects.all()
    serializer_class = RVC_AudioSerializer

class EvaluationViewSet(viewsets.ModelViewSet): 
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer