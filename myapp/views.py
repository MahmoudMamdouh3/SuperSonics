from rest_framework import viewsets
from .models import *
from .serializers import UserSerializer, SubscriptionSerializer, ArtistSerializer, AudioSerializer, PreProSerializer, EnhancedAudioSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = artist.objects.all()
    serializer_class = ArtistSerializer

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

class PreProViewSet(viewsets.ModelViewSet):
    queryset = pre_pro.objects.all()
    serializer_class = PreProSerializer

class EnhancedAudioViewSet(viewsets.ModelViewSet):
    queryset = Enhanced_audio.objects.all()
    serializer_class = EnhancedAudioSerializer