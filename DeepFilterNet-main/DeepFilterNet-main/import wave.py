from pydub import AudioSegment
sound1 = AudioSegment.from_file("D:/Grad/Final/Phantasmagoria in Two(Mixed).wav", format="wav")
sound2 = AudioSegment.from_file("D:/Grad/demucs-main/demucs-main/separated/htdemucs/Phantasmagoria in Two/other.wav", format="wav")

# sound1 6 dB louder
louder = sound1 + 6

# Overlay sound2 over sound1 at position 0  (use louder instead of sound1 to use the louder version)
overlay = sound1.overlay(sound2, position=0)


# simple export
file_handle = overlay.export("D:/Grad/Final/Phantasmagoria in Two(Mixed).wav", format="wav")



# sound1 = AudioSegment.from_file("DeepFilterNet-main/DeepFilterNet/arabic/elvis_DeepFilterNet3.wav", format="wav")
# louder = sound1 + 1
# louder2= louder 
# overlay = louder.overlay(louder2, position=0)
# file_handle = overlay.export("D:/Grad/lq/elvis_DeepFilterNet3.wav", format="wav")