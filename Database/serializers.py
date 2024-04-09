
from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = '__all__'

class Pre_pro_audioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pre_pro_audio
        fields = '__all__'

class Enhanced_audioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enhanced_audio
        fields = '__all__'        