from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = artist
        fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = '__all__'

class PreProSerializer(serializers.ModelSerializer):
    class Meta:
        model = pre_pro
        fields = '__all__'

class EnhancedAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enhanced_audio
        fields = '__all__'