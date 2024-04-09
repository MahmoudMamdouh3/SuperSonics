import librosa
import numpy as np
from .models import Audio, Pre_pro_audio

def preprocess_audio(audio_id, high_threshold=20, medium_threshold=10):
    try:
        audio_record = Audio.objects.get(id=audio_id)
    except Audio.DoesNotExist:
        print("Audio with ID {} does not exist.".format(audio_id))
        return None

    audio_path = audio_record.file.path

    y, sr = librosa.load(audio_path)

    noise = np.random.normal(0, 0.01, len(y))  
    snr = calculate_snr(y, noise)

    if snr > high_threshold:
        y_clean = noise_reduction(y, noise, snr)
    elif snr > medium_threshold:
        y_clean = noise_reduction(y, noise, snr)
    else:
        y_clean = noise_reduction(y, noise, snr)

    prepro_audio = Pre_pro_audio(audio=audio_record)
    prepro_audio.preprocessed_file.save('preprocessed_audio_{}.wav'.format(audio_id), y_clean)

    return y_clean

def calculate_snr(y, noise):
    signal_energy = np.mean(np.square(y))
    noise_energy = np.mean(np.square(noise))
    snr_db = 10 * np.log10(signal_energy / noise_energy)
    return snr_db

def noise_reduction(y, noise, snr):
    return wiener_filter(y, noise, snr)

def wiener_filter(y, noise, snr):
    return y 
