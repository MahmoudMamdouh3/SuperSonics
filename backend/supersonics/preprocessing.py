import librosa
import numpy as np
from sklearn.decomposition import FastICA



def load_audio(audio_file_path):
    # Load the audio file
    y, sr = librosa.load(audio_file_path, sr=None)
    return y, sr

def preprocess_audio(uploaded_file):
    # Load audio from uploaded file
    y, sr = load_audio(uploaded_file)

    # Apply noise removal
    y_denoised = remove_noise(y, sr)

    # Apply other preprocessing steps as needed
    # e.g., pitch extraction, layer separation, etc.

    # For simplicity, let's just return the preprocessed audio data
    return y_denoised, sr

def remove_noise(y, sr):
    # Estimate the signal power
    signal_power = np.mean(np.abs(y) ** 2)

    # Estimate the noise power
    noise = y - librosa.effects.preemphasis(y)
    noise_power = np.mean(np.abs(noise) ** 2)

    # Compute the signal-to-noise ratio (SNR)
    snr = 10 * np.log10(signal_power / noise_power)

    # Set a threshold for noise removal based on the SNR
    # Adjust the threshold based on your specific requirements and preferences
    if snr > 20:
        threshold = 0.01  # High SNR, use a low threshold for aggressive noise removal
    elif snr > 10:
        threshold = 0.05  # Medium SNR, use a moderate threshold
    else:
        threshold = 0.1   # Low SNR, use a higher threshold for conservative noise removal

    # Perform noise reduction with the dynamic threshold
    y_denoised = librosa.effects.preemphasis(y, threshold=threshold)

    return y_denoised

def separate_layers(audio_data):
    # Apply Independent Component Analysis (ICA) for layer separation
    ica = FastICA(n_components=2)  # Assuming 2 layers for simplicity
    layers = ica.fit_transform(audio_data.T)

    # Transpose the result back to the original shape
    layers = layers.T

    return layers
