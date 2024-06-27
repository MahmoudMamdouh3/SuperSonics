import numpy as np
import librosa
import scipy.signal as signal
import scipy.fftpack as fft

# Load Audio Files
original, fs = librosa.load('D:/CMGAN-main/CMGAN-main/DS/test/noisy/p232_003.wav', sr=None)
upscaled, _ = librosa.load(
    'output/23_06_2024_12_08_00/p232_003_AudioSR.wav', sr=None)

# Ensure both audio files are of the same length
min_length = min(len(original), len(upscaled))
original = original[:min_length]
upscaled = upscaled[:min_length]

# Calculate SNR
def calculate_snr(original, upscaled):
    noise = upscaled - original
    snr_value = 10 * np.log10(np.sum(original ** 2) / np.sum(noise ** 2))
    return snr_value

snr_value = calculate_snr(original, upscaled)

# Calculate PSNR
def calculate_psnr(original, upscaled):
    mse = np.mean((original - upscaled) ** 2)
    max_val = np.max(np.abs(original))
    psnr_value = 10 * np.log10(max_val ** 2 / mse)
    return psnr_value

psnr_value = calculate_psnr(original, upscaled)

# Calculate Log-Spectral Distance (LSD)
def calculate_lsd(original, upscaled, fs):
    nfft = 1024
    f, t, S1 = signal.spectrogram(original, fs, window='hamming', nperseg=nfft, noverlap=nfft//2)
    _, _, S2 = signal.spectrogram(upscaled, fs, window='hamming', nperseg=nfft, noverlap=nfft//2)
    LSD = np.mean(np.sqrt(np.mean((20 * np.log10(np.abs(S1) + np.finfo(float).eps) - 20 * np.log10(np.abs(S2) + np.finfo(float).eps)) ** 2, axis=0)))
    return LSD

lsd_value = calculate_lsd(original, upscaled, fs)

# Display Results
print(f'SNR: {snr_value:.2f} dB')
print(f'PSNR: {psnr_value:.2f} dB')
print(f'LSD: {lsd_value:.2f}')
