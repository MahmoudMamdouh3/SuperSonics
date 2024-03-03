# import wave

# # Open the file
# with wave.open('D:/Grad/demucs-main/demucs-main/separated/htdemucs/Hayart Alby Maak Umm Kulthum 2/resampled_vocals.wav', 'rb') as wav_file:
#     # Get the sample rate
#     sample_rate = wav_file.getframerate()

# print(f"The sample rate of the audio file is: {sample_rate} Hz")
import os
import librosa
import soundfile as sf

# Directory containing the audio files
dir_path = 'D:/Grad/Test/'

# Iterate over all files in the directory
for filename in os.listdir(dir_path):
    # Check if the file is a .wav file
    if filename.endswith('.wav'):
        # Full path to the file
        file_path = os.path.join(dir_path, filename)

        # Load the audio file with the original sample rate
        y, sr = librosa.load(file_path, sr=None)

        # Resample the audio to 48000 Hz
        y_resampled = librosa.resample(y, sr, 48000)

        # Create a new filename by appending 'hq' to the original filename (without the extension)
        base_filename, _ = os.path.splitext(filename)
        new_filename = f"{base_filename}hq.wav"

        # Full path to the new file
        new_file_path = os.path.join(dir_path, new_filename)

        # Save the resampled audio
        sf.write(new_file_path, y_resampled, 48000)