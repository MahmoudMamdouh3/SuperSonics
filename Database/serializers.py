
from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = account
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

class upscaled_audioSerializer(serializers.ModelSerializer):
    class Meta:
        model = upscaled_audio
        fields = '__all__'

class RVC_AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RVC_Audio
        fields = '__all__'

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'  
        