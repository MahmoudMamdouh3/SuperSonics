# myapp/utils.py

from django.contrib.auth.models import *
from rest_framework import viewsets
from Database.models import *
from .serializers import *
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from subprocess import run, PIPE
from django.views import View

from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView



def get_file_names(request):
    files = Audio.objects.all()
    file_names = [file.name for file in files]  # Corrected line
    return JsonResponse({'fileNames': file_names}, safe=False)

class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')

        print(f"Attempting to authenticate user: {username} with password: {password}")

        account = authenticate(username=username, password=password)

        if account is not None:
            print(f"Authenticated user: {username}, is_active: {account.is_active}")
            if account.is_active:
                if account.is_superuser:
                    print(f"Superuser {username} attempted to authenticate")
                    return Response({'status': 'Unauthorized - superusers cannot authenticate with this view'}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response({'status': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'Unauthorized - user is inactive'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            print(f"Failed to authenticate user: {username}")
            return Response({'status': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

class CheckUsernameView(View):
    def get(self, request, *args, **kwargs):
        username = request.GET.get('username')
        if username:
            exists = account.objects.filter(username__iexact=username).exists()
            return JsonResponse({'exists': exists})
        else:
            return JsonResponse({'error': 'Username not provided'}, status=400)

class RunPythonScriptView(APIView):
    def post(self, request, format=None):
        audio_file_name = request.data.get('audioFileName')

        if audio_file_name is None:
            return Response({'error': 'audioFileName is required'}, status=400)

        if not isinstance(audio_file_name, str):
            return Response({'error': 'audioFileName must be a string'}, status=400)

        audio_file_name_without_extension, _ = os.path.splitext(audio_file_name)  # Remove the .wav extension

        #
        # process = run(['python', 'Z:/SuperSonics/versatile_audio_super_resolution-main/audiosr ','-i',  audio_file_name_without_extension], stdout=PIPE, stderr=PIPE)
        command = [
            'python', 
            'Z:/SuperSonics/versatile_audio_super_resolution-main/audiosr/__main__.py',
             '-i',
            audio_file_name_without_extension
        ]

        process = run(command, stdout=PIPE, stderr=PIPE)

# Example of how to access the output and error
        stdout_output = process.stdout
        stderr_output = process.stderr
        print("stdout:", process.stdout.decode())  # Print the stdout output
        print("stderr:", process.stderr.decode())  # Print the stderr output
        if process.returncode != 0:
            return Response({'error': process.stderr.decode()}, status=500)

        return Response({'message': 'Python script ran successfully'}, status=200)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = account.objects.all()
    serializer_class = AccountSerializer

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

    def create(self, request, *args, **kwargs):
        audio_file = request.data.get('audio')
        filename = os.path.splitext(audio_file.name)[0] if audio_file else ''  # Modify this line
        request.data['name'] = filename
        return super().create(request, *args, **kwargs)

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