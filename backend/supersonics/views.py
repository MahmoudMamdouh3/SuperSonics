from django.http import HttpResponse
from .models import PreprocessedAudio
from .preprocessing import preprocess_audio

def preprocess_audio_view(request):
    if request.method == 'POST' and request.FILES.get('audio_file'):
        uploaded_file = request.FILES['audio_file']

        try:
            # Perform audio preprocessing
            preprocessed_audio_data = preprocess_audio(uploaded_file)
            
            # Save preprocessed audio data to database
            preprocessed_audio = PreprocessedAudio(data=preprocessed_audio_data)
            preprocessed_audio.save()

            return HttpResponse("Audio preprocessed and saved successfully")
        
        except Exception as e:
            return HttpResponse("Error during audio preprocessing: " + str(e), status=500)

    else:
        return HttpResponse("No audio file uploaded or invalid request method", status=400)
