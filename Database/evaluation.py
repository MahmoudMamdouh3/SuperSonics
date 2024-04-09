import librosa
import numpy as np
from Database.models import *



def evaluate_audio_metrics(audio_id):
    try:
        audio_record = Audio.objects.get(id=audio_id)
    except Audio.DoesNotExist:
        print(f"Audio with ID {audio_id} does not exist.")
        return None

    original_audio_path = audio_record.original_file.path
    processed_audio_path = audio_record.processed_file.path
    
    y_original, sr_original = librosa.load(original_audio_path)
    y_processed, sr_processed = librosa.load(processed_audio_path)
    
    if sr_original != sr_processed:
        raise ValueError("Sample rates do not match.")
    
    snr_value = calculate_snr(y_original, y_processed)
    mse_value = mean_squared_error(y_original, y_processed)
    thd_value = total_harmonic_distortion(y_processed, sr_processed)
    
    evaluation = Evaluation(
        audio=audio_record,
        snr=snr_value,
        mse=mse_value,
        thd=thd_value
    )
    evaluation.save()
    
    return snr_value, mse_value, thd_value

def calculate_snr(original, processed):
    noise = original - processed
    signal_power = np.mean(original ** 2)
    noise_power = np.mean(noise ** 2)
    snr = 10 * np.log10(signal_power / noise_power)
    return snr

def mean_squared_error(original, processed):
    mse = np.mean((original - processed) ** 2)
    return mse

def total_harmonic_distortion(processed, sample_rate):
    spectrum = np.abs(np.fft.fft(processed))
    fundamental_freq_bin = int(440 / (sample_rate / 2) * len(processed))
    harmonic_bins = [i * fundamental_freq_bin for i in range(2, 6)]
    thd = np.sum([spectrum[int(bin)] for bin in harmonic_bins]) / spectrum[fundamental_freq_bin]
    return thd * 100  

audio_id = 1  
snr, mse, thd = evaluate_audio_metrics(audio_id)
print(f"SNR: {snr} dB, MSE: {mse}, THD: {thd}%")
