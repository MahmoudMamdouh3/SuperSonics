import os
import librosa
import numpy as np
from sklearn.decomposition import FastICA
import scipy.signal

def load_audio(audio_file_path):
    """
    Load audio file from the specified path.

    Args:
        audio_file_path (str): Path to the audio file.

    Returns:
        y (np.ndarray): Audio signal.
        sr (int): Sampling rate.
    """
    if not os.path.exists(audio_file_path):
        raise FileNotFoundError(f"Audio file '{audio_file_path}' not found.")
    
    y, sr = librosa.load(audio_file_path, sr=None)
    return y, sr

def preprocess_audio(uploaded_file):
    """
    Preprocess the uploaded audio file.

    Args:
        uploaded_file (str): Path to the uploaded audio file.

    Returns:
        y_preprocessed (np.ndarray): Preprocessed audio signal.
        sr (int): Sampling rate.
    """
    try:
        # Load audio from uploaded file
        y, sr = load_audio(uploaded_file)

        # Apply noise removal
        y_denoised = remove_noise(y, sr)

        # Apply filtering to remove frequencies outside the human singing range
        y_filtered = filtering(y_denoised, sr)

        # For simplicity, let's just return the preprocessed audio data
        return y_filtered, sr
    except Exception as e:
        raise RuntimeError(f"Error occurred during audio preprocessing: {str(e)}")

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

def filtering(y, sr, filter_type='high_pass', cutoff_freq=1000):
    if filter_type == 'high_pass':
        # Apply high-pass filtering
        y_filtered = high_pass_filter(y, sr, cutoff_freq)
    elif filter_type == 'low_pass':
        # Apply low-pass filtering
        y_filtered = low_pass_filter(y, sr, cutoff_freq)
    else:
        # If invalid filter type provided, return original audio
        y_filtered = y

    return y_filtered

def high_pass_filter(y, sr, cutoff_freq):
    # Design a high-pass filter
    nyquist = 0.5 * sr
    normal_cutoff = cutoff_freq / nyquist
    b, a = scipy.signal.butter(4, normal_cutoff, btype='high', analog=False)

    # Apply the filter to the audio data
    y_filtered = scipy.signal.filtfilt(b, a, y)

    return y_filtered

def low_pass_filter(y, sr, cutoff_freq):
    # Design a low-pass filter
    nyquist = 0.5 * sr
    normal_cutoff = cutoff_freq / nyquist
    b, a = scipy.signal.butter(4, normal_cutoff, btype='low', analog=False)

    # Apply the filter to the audio data
    y_filtered = scipy.signal.filtfilt(b, a, y)

    return y_filtered
