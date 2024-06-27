import os
from django.conf import settings
import sys

# Append your project's directory to sys.path
sys.path.append('Z:/SuperSonics')



# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SuperSonic.settings")

# Now you can set up Django
import django
django.setup()

# Now import Django models

from django.core.files import File
from Database.models import *
import os
import sqlite3
import torch
import logging
from audiosr import super_resolution, build_model, save_wave, get_time, read_list
import argparse
from subprocess import run, PIPE

from Database.models import Audio


os.environ["TOKENIZERS_PARALLELISM"] = "true"
matplotlib_logger = logging.getLogger('matplotlib')
matplotlib_logger.setLevel(logging.WARNING)

parser = argparse.ArgumentParser()

parser.add_argument(
    "-i",
    "--input_audio_file",
    type=str,
    required=False,
    help="Input audio file for audio super resolution",
)

parser.add_argument(
    "-il",
    "--input_file_list",
    type=str,
    required=False,
    default="",
    help="A file that contains all audio files that need to perform audio super resolution",
)

parser.add_argument(
    "-s",
    "--save_path",
    type=str,
    required=False,
    help="The path to save model output",
    default="./output",
)

parser.add_argument(
    "--model_name",
    type=str,
    required=False,
    help="The checkpoint you gonna use",
    default="basic",
    choices=["basic","speech"]
)

parser.add_argument(
    "-d",
    "--device",
    type=str,
    required=False,
    help="The device for computation. If not specified, the script will automatically choose the device based on your environment.",
    default="auto",
)

parser.add_argument(
    "--ddim_steps",
    type=int,
    required=False,
    default=70,
    help="The sampling step for DDIM",
)

parser.add_argument(
    "-gs",
    "--guidance_scale",
    type=float,
    required=False,
    default=1.5,
    help="Guidance scale (Large => better quality and relavancy to text; Small => better diversity)",
)

parser.add_argument(
    "--seed",
    type=int,
    required=False,
    default=250,
    help="Change this value (any integer number) will lead to a different generation result.",
)

parser.add_argument(
    "--suffix",
    type=str,
    required=False,
    help="Suffix for the output file",
    default="_AudioSR",
)

args = parser.parse_args()
torch.set_float32_matmul_precision("high")
save_path = os.path.join(args.save_path, get_time())

#assert args.input_file_list is not None or args.input_audio_file is not None,"Please provide either a list of audio files or a single audio file"
if len(sys.argv) < 2:
        print("Please provide an audio file name as a command-line argument.")
        sys.exit(1)
audio_file_name = sys.argv[2]
conn = sqlite3.connect('Database.sqlite3')
cur = conn.cursor()

# # Define and execute SQL query to fetch audio data
print (audio_file_name)
cur.execute("SELECT audio FROM Database_audio WHERE name = ?", (audio_file_name,))
row = cur.fetchone()
if row is None:
    print(f"No audio data found for file name {audio_file_name}")
    sys.exit(1)

audio_data = row[0] 

# # Close cursor and connection
cur.close()
conn.close()

input_file = audio_data
random_seed = args.seed
sample_rate=48000
latent_t_per_second=12.8
guidance_scale = args.guidance_scale

os.makedirs(save_path, exist_ok=True)
audiosr = build_model(model_name=args.model_name, device=args.device)

if(args.input_file_list):
    print("Generate audio based on the text prompts in %s" % args.input_file_list)
    files_todo = read_list(args.input_file_list)
else: 
    files_todo = [input_file]
    
for input_file in files_todo:
    name = os.path.splitext(os.path.basename(input_file))[0] + args.suffix

    waveform = super_resolution(
        audiosr,
        input_file,
        seed=random_seed,
        guidance_scale=guidance_scale,
        ddim_steps=args.ddim_steps,
        latent_t_per_second=latent_t_per_second
    )
    
    save_wave(waveform, inputpath=input_file, savepath=save_path, name=name, samplerate=sample_rate)
audio_file_name_without_extension, _ = os.path.splitext(name)
with open(input_file, 'rb') as f:
            audio_instance = Enhanced_audio(audio=File(f), name=audio_file_name_without_extension  )#user_id=user_id
            audio_instance.save()
command = [
            'python', 
            'Z:/SuperSonics/DeepFilterNet-main/DeepFilterNet/df/enhance.py',
             
            audio_file_name_without_extension
        ]

process = run(command, stdout=PIPE, stderr=PIPE)

# Example of how to access the output and error
stdout_output = process.stdout
stderr_output = process.stderr
print("stdout:", process.stdout.decode())  # Print the stdout output
print("stderr:", process.stderr.decode())  # Print the stderr output
