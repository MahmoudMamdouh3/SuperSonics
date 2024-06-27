# # myapp/views.py

# from rest_framework import viewsets
# from .models import *
# from .serializers import *
# from .utiles import *
# from django.shortcuts import render


# # class UserViewSet(viewsets.ModelViewSet):
# #     queryset = Account.objects.all()
# #     serializer_class = UserSerializer

# import os
# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.core.files.storage import default_storage
# from django.core.files.base import ContentFile
# from .models import Video

# import assemblyai as aai

# # Set your AssemblyAI API key
# aai.settings.api_key = "fa08fc0604e44c31b52f69e79e280248"

# # Initialize the transcriber
# transcriber = aai.Transcriber()

# @csrf_exempt
# def upload_video(request):
#     if request.method == 'POST':
#         video_file = request.FILES.get('video_file')
#         if not video_file:
#             return JsonResponse({'error': 'No file uploaded'}, status=400)
        
#         # Save the file
#         file_path = default_storage.save(video_file.name, ContentFile(video_file.read()))
        
#         # Process the video (e.g., add subtitles)
#         video_base_name = os.path.splitext(os.path.basename(file_path))[0]
#         video_path = default_storage.path(file_path)
#         transcript = transcriber.transcribe(video_path)
#         subtitles = transcript.export_subtitles_srt()
#         srt_file_path = os.path.join(default_storage.location, f"{video_base_name}.srt")
        
#         with open(srt_file_path, "w") as f:
#             f.write(subtitles)
        
#         output_video_file = os.path.join(default_storage.location, f"{video_base_name}_subtitled.mp4")
#         process_video_with_subtitles(video_path, srt_file_path, output_video_file)

#         processed_video_url = default_storage.url(output_video_file)

#         return JsonResponse({'processed_video_url': processed_video_url})

#     return JsonResponse({'error': 'Invalid request method'}, status=405)

# def process_video_with_subtitles(video_path, srt_file_path, output_video_file):
#     import pysrt
#     from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip

#     def time_to_seconds(time_obj):
#         return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.milliseconds / 1000

#     def create_subtitle_clips(subtitles, videosize, fontsize=24, font='Arial', color='yellow'):
#         subtitle_clips = []
#         for subtitle in subtitles:
#             start_time = time_to_seconds(subtitle.start)
#             end_time = time_to_seconds(subtitle.end)
#             duration = end_time - start_time
#             video_width, video_height = videosize
#             text_clip = TextClip(subtitle.text, fontsize=fontsize, font=font, color=color, bg_color='black',
#                                 size=(video_width * 3 / 4, None), method='caption').set_start(start_time).set_duration(duration)
#             subtitle_x_position = 'center'
#             subtitle_y_position = video_height * 4 / 5
#             text_position = (subtitle_x_position, subtitle_y_position)
#             subtitle_clips.append(text_clip.set_position(text_position))
#         return subtitle_clips

#     video = VideoFileClip(video_path)
#     subtitles = pysrt.open(srt_file_path)
#     subtitle_clips = create_subtitle_clips(subtitles, video.size)
#     final_video = CompositeVideoClip([video] + subtitle_clips)
#     final_video.write_videofile(output_video_file)

# views.py

# import os
# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.core.files.storage import default_storage
# from django.core.files.base import ContentFile
# from .models import Video
# import assemblyai as aai
# import cv2
# import pysrt
# from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
# import speech_recognition as sr
# # Set your AssemblyAI API key
# aai.settings.api_key = "fa08fc0604e44c31b52f69e79e280248"

# # Initialize the transcriber
# transcriber = aai.Transcriber()

# @csrf_exempt
# def upload_video(request):
#     if request.method == 'POST':
#         video_file = request.FILES.get('video_file')
#         if not video_file:
#             return JsonResponse({'error': 'No file uploaded'}, status=400)
        
#         # Save the file
#         file_path = default_storage.save(video_file.name, ContentFile(video_file.read()))
        
#         # Process the video (e.g., add subtitles)
#         video_base_name = os.path.splitext(os.path.basename(file_path))[0]
#         video_path = default_storage.path(file_path)
#         transcript = transcriber.transcribe(video_path)
#         subtitles = transcript.export_subtitles_srt()
#         srt_file_path = os.path.join(default_storage.location, f"{video_base_name}.srt")
        
#         with open(srt_file_path, "w") as f:
#             f.write(subtitles)
        
#         output_video_file = os.path.join(default_storage.location, f"{video_base_name}_subtitled.mp4")
#         process_video_with_subtitles(video_path, srt_file_path, output_video_file)

#         processed_video_url = request.build_absolute_uri(default_storage.url(output_video_file))

#         return JsonResponse({'processed_video_url': processed_video_url})

#     return JsonResponse({'error': 'Invalid request method'}, status=405)

# def process_video_with_subtitles(video_path, srt_file_path, output_video_file):
#     import pysrt
#     from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip

#     def time_to_seconds(time_obj):
#         return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.milliseconds / 1000

#     def create_subtitle_clips(subtitles, videosize, fontsize=24, font='Arial', color='yellow'):
#         subtitle_clips = []
#         for subtitle in subtitles:
#             start_time = time_to_seconds(subtitle.start)
#             end_time = time_to_seconds(subtitle.end)
#             duration = end_time - start_time
#             video_width, video_height = videosize
#             text_clip = TextClip(subtitle.text, fontsize=fontsize, font=font, color=color, bg_color='black',
#                                 size=(video_width * 3 / 4, None), method='caption').set_start(start_time).set_duration(duration)
#             subtitle_x_position = 'center'
#             subtitle_y_position = video_height * 4 / 5
#             text_position = (subtitle_x_position, subtitle_y_position)
#             subtitle_clips.append(text_clip.set_position(text_position))
#         return subtitle_clips

#     video = VideoFileClip(video_path)
#     subtitles = pysrt.open(srt_file_path)
#     subtitle_clips = create_subtitle_clips(subtitles, video.size)
#     final_video = CompositeVideoClip([video] + subtitle_clips)
#     final_video.write_videofile(output_video_file)
    
    
# def recognize_audio_segment(audio_file, start_time, end_time):
#     recognizer = sr.Recognizer()
#     with sr.AudioFile(audio_file) as source:
#         audio_data = recognizer.record(source, offset=start_time, duration=end_time - start_time)
#         try:
#             text = recognizer.recognize_google(audio_data, language='ar')
#             return text
#         except sr.UnknownValueError:
#             return ""

# def time_to_seconds(time_obj):
#     return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.milliseconds / 1000

# def create_subtitle_clips1(subtitles, videosize, fontsize=24, font='Arial', color='yellow', debug=False):
#     subtitle_clips = []
#     for subtitle in subtitles:
#         start_time = time_to_seconds(subtitle.start)
#         end_time = time_to_seconds(subtitle.end)
#         duration = end_time - start_time
#         try:
#             video_width, video_height = videosize
#             text_clip = TextClip(subtitle.text, fontsize=fontsize, font=font, color=color, bg_color='black',
#                                  size=(video_width * 3 / 4, None), method='caption').set_start(start_time).set_duration(duration)
#             subtitle_y_position = video_height * 4 / 5
#             text_position = ('center', subtitle_y_position)
#             subtitle_clips.append(text_clip.set_position(text_position))
#         except Exception as e:
#             if debug:
#                 print(f"Error processing subtitle '{subtitle.text}': {e}")
#     return subtitle_clips

# @csrf_exempt
# def upload_video_with_subtitles(request):
#     if request.method == 'POST':
#         video_file = request.FILES.get('video_file')
#         if not video_file:
#             return JsonResponse({'error': 'No file uploaded'}, status=400)
        
#         file_path = default_storage.save(video_file.name, ContentFile(video_file.read()))
#         video_path = default_storage.path(file_path)
#         video_base_name = os.path.splitext(os.path.basename(file_path))[0]

#         video = VideoFileClip(video_path)
#         cap = cv2.VideoCapture(video_path)
#         fps = cap.get(cv2.CAP_PROP_FPS)
#         frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#         duration = frame_count / fps
#         audio = video.audio

#         audio_file_path = os.path.splitext(video_path)[0] + ".wav"
#         audio.write_audiofile(audio_file_path, codec='pcm_s16le')

#         srt = pysrt.SubRipFile()
#         segment_duration = 5

#         for i in range(0, int(duration), segment_duration):
#             recognized_text = recognize_audio_segment(audio_file_path, i, min(i + segment_duration, duration))
#             start_time = i
#             end_time = min(i + segment_duration, duration)
#             srt_entry = pysrt.SubRipItem(index=len(srt) + 1, start=pysrt.SubRipTime(seconds=start_time), end=pysrt.SubRipTime(seconds=end_time), text=recognized_text)
#             srt.append(srt_entry)

#         srt_file_path = os.path.splitext(video_path)[0] + ".srt"
#         srt.save(srt_file_path, encoding='utf-8')

#         output_video_file = os.path.join(default_storage.location, f"{video_base_name}_subtitled.mp4")
#         subtitles = pysrt.open(srt_file_path)
#         subtitle_clips = create_subtitle_clips1(subtitles, video.size)
#         final_video = CompositeVideoClip([video] + subtitle_clips)
#         final_video.write_videofile(output_video_file)

#         processed_video_url = request.build_absolute_uri(default_storage.url(output_video_file))

#         return JsonResponse({'processed_video_url': processed_video_url})

#     return JsonResponse({'error': 'Invalid request method'}, status=405)
import os
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import Video
import assemblyai as aai
import cv2
import pysrt
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
import speech_recognition as sr

# Set your AssemblyAI API key
aai.settings.api_key = "fa08fc0604e44c31b52f69e79e280248"

# Initialize the transcriber
transcriber = aai.Transcriber()

def recognize_audio_segment(audio_file, start_time, end_time):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source, offset=start_time, duration=end_time - start_time)
        try:
            text = recognizer.recognize_google(audio_data, language='ar')
            return text
        except sr.UnknownValueError:
            return ""

def time_to_seconds(time_obj):
    return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.milliseconds / 1000

def create_subtitle_clips(subtitles, videosize, fontsize=24, font='Arial', color='yellow', debug=False):
    subtitle_clips = []
    for subtitle in subtitles:
        start_time = time_to_seconds(subtitle.start)
        end_time = time_to_seconds(subtitle.end)
        duration = end_time - start_time
        try:
            video_width, video_height = videosize
            text_clip = TextClip(subtitle.text, fontsize=fontsize, font=font, color=color, bg_color='black',
                                 size=(video_width * 3 / 4, None), method='caption').set_start(start_time).set_duration(duration)
            subtitle_y_position = video_height * 4 / 5
            text_position = ('center', subtitle_y_position)
            subtitle_clips.append(text_clip.set_position(text_position))
        except Exception as e:
            if debug:
                print(f"Error processing subtitle '{subtitle.text}': {e}")
    return subtitle_clips

@csrf_exempt
def upload_video(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video_file')
        if not video_file:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        # Save the file
        file_path = default_storage.save(video_file.name, ContentFile(video_file.read()))
        
        # Process the video (e.g., add subtitles)
        video_base_name = os.path.splitext(os.path.basename(file_path))[0]
        video_path = default_storage.path(file_path)
        transcript = transcriber.transcribe(video_path)
        subtitles = transcript.export_subtitles_srt()
        srt_file_path = os.path.join(default_storage.location, f"{video_base_name}.srt")
        
        with open(srt_file_path, "w") as f:
            f.write(subtitles)
        
        output_video_file = os.path.join(default_storage.location, f"{video_base_name}_subtitled.mp4")
        process_video_with_subtitles(video_path, srt_file_path, output_video_file)

        processed_video_url = request.build_absolute_uri(default_storage.url(output_video_file))

        return JsonResponse({'processed_video_url': processed_video_url})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def process_video_with_subtitles(video_path, srt_file_path, output_video_file):
    import pysrt
    from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip

    def time_to_seconds(time_obj):
        return time_obj.hours * 3600 + time_obj.minutes * 60 + time_obj.seconds + time_obj.milliseconds / 1000

    def create_subtitle_clips(subtitles, videosize, fontsize=24, font='Arial', color='yellow'):
        subtitle_clips = []
        for subtitle in subtitles:
            start_time = time_to_seconds(subtitle.start)
            end_time = time_to_seconds(subtitle.end)
            duration = end_time - start_time
            video_width, video_height = videosize
            text_clip = TextClip(subtitle.text, fontsize=fontsize, font=font, color=color, bg_color='black',
                                size=(video_width * 3 / 4, None), method='caption').set_start(start_time).set_duration(duration)
            subtitle_x_position = 'center'
            subtitle_y_position = video_height * 4 / 5
            text_position = (subtitle_x_position, subtitle_y_position)
            subtitle_clips.append(text_clip.set_position(text_position))
        return subtitle_clips

    video = VideoFileClip(video_path)
    subtitles = pysrt.open(srt_file_path)
    subtitle_clips = create_subtitle_clips(subtitles, video.size)
    final_video = CompositeVideoClip([video] + subtitle_clips)
    final_video.write_videofile(output_video_file)

@csrf_exempt
def upload_video_with_subtitles(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video_file')
        if not video_file:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file_path = default_storage.save(video_file.name, ContentFile(video_file.read()))
        video_path = default_storage.path(file_path)
        video_base_name = os.path.splitext(os.path.basename(file_path))[0]

        video = VideoFileClip(video_path)
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = frame_count / fps
        audio = video.audio

        audio_file_path = os.path.splitext(video_path)[0] + ".wav"
        audio.write_audiofile(audio_file_path, codec='pcm_s16le')

        srt = pysrt.SubRipFile()
        segment_duration = 5

        for i in range(0, int(duration), segment_duration):
            recognized_text = recognize_audio_segment(audio_file_path, i, min(i + segment_duration, duration))
            start_time = i
            end_time = min(i + segment_duration, duration)
            srt_entry = pysrt.SubRipItem(index=len(srt) + 1, start=pysrt.SubRipTime(seconds=start_time), end=pysrt.SubRipTime(seconds=end_time), text=recognized_text)
            srt.append(srt_entry)

        srt_file_path = os.path.splitext(video_path)[0] + ".srt"
        srt.save(srt_file_path, encoding='utf-8')

        output_video_file = os.path.join(default_storage.location, f"{video_base_name}_subtitled.mp4")
        subtitles = pysrt.open(srt_file_path)
        subtitle_clips = create_subtitle_clips(subtitles, video.size)
        final_video = CompositeVideoClip([video] + subtitle_clips)
        final_video.write_videofile(output_video_file)

        processed_video_url = request.build_absolute_uri(default_storage.url(output_video_file))

        return JsonResponse({'processed_video_url': processed_video_url})

    return JsonResponse({'error': 'Invalid request method'}, status=405)
