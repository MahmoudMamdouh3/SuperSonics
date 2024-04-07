from django.shortcuts import render

from myapp.models import *

# Create your views here.
def get_user_by_id(user_id):
    try:
        user = User.objects.get(id_number=user_id)
        return user
    except User.DoesNotExist:
        return None




def get_user_by_username(username):
    try:
        user = User.objects.get(username=username)
        return user
    except User.DoesNotExist:
        return None

def update_user(user_id, new_info):
    try:
        user = User.objects.get(id_number=user_id)
        # Assuming new_info is a dictionary with the new values
        for attr, value in new_info.items():
            if hasattr(user, attr):
                setattr(user, attr, value)
        
        # Validate the new values
        user.full_clean()

        user.save()
    except User.DoesNotExist:
        return None
    except ValidationError as e:
        # Handle validation errors here
        print(e)
        return None

def delete_user(user_id):
    try:
        user = User.objects.get(id_number=user_id)
        user.delete()
    except User.DoesNotExist:
        return None


def get_artist_by_id(artist_id):
    try:
        artist = artist.objects.get(Artist_ID=artist_id)
        return artist
    except artist.DoesNotExist:
        return None

def get_artist_by_name(artist_name):
    try:
        artist = artist.objects.get(Artist_Name=artist_name)
        return artist
    except artist.DoesNotExist:
        return None

def get_enhanced_audio_by_id(audio_id):
            try:
                enhanced_audio = Enhanced_audio.objects.get(Enhanced_ID=audio_id)
                return enhanced_audio
            except Enhanced_audio.DoesNotExist:
                return None

def get_enhanced_audio_by_name(audio_name):
            try:
                enhanced_audio = Enhanced_audio.objects.get(Enhanced_Name=audio_name)
                return enhanced_audio
            except Enhanced_audio.DoesNotExist:
                return None

def get_pre_pro_audio_by_id(audio_id):
            try:
                pre_pro_audio = pre_pro.objects.get(Pre_pro_ID=audio_id)
                return pre_pro_audio
            except pre_pro.DoesNotExist:
                return None

def get_pre_pro_audio_by_name(audio_name):
            try:
                pre_pro_audio = pre_pro.objects.get(Pre_pro_Name=audio_name)
                return pre_pro_audio
            except pre_pro.DoesNotExist:
                return None
            
            
def add_user(Fname, Lname, username, password, Email, Age, Phone, Address, City, Country, Postal_Code, user_image):
    user = User(Fname=Fname, Lname=Lname, username=username, password=password, Email=Email, Age=Age, Phone=Phone, Address=Address, City=City, Country=Country, Postal_Code=Postal_Code, user_image=user_image)
    user.save()
    return user

def add_subscription(User, Card_No, CVV, Card_Name, End_Date):
    subscription = Subscription(User=User, Card_No=Card_No, CVV=CVV, Card_Name=Card_Name, End_Date=End_Date)
    subscription.save()
    return subscription

def add_artist(Artist_Name, user, Artist_voice, Artist_image, Artist_songs, song_lyrics):
    artist = artist(Artist_Name=Artist_Name, user=user, Artist_voice=Artist_voice, Artist_image=Artist_image, Artist_songs=Artist_songs, song_lyrics=song_lyrics)
    artist.save()
    return artist

def add_audio(user, Audio_Name, Audio, size, date, time):
    audio = Audio(user=user, Audio_Name=Audio_Name, Audio=Audio, size=size, date=date, time=time)
    audio.save()
    return audio

def add_pre_pro(user, Pre_pro_Name, Pre_pro_audio, size, date, time):
    pre_pro = pre_pro(user=user, Pre_pro_Name=Pre_pro_Name, Pre_pro_audio=Pre_pro_audio, size=size, date=date, time=time)
    pre_pro.save()
    return pre_pro

def add_enhanced_audio(user, Enhanced_Name, Enhanced_audio, size, date, time):
    enhanced_audio = Enhanced_audio(user=user, Enhanced_Name=Enhanced_Name, Enhanced_audio=Enhanced_audio, size=size, date=date, time=time)
    enhanced_audio.save()
    return enhanced_audio

def handle_audio_upload(user, file, audio_name):
    validate_audio_file(file)
    audio = Audio(user=user, Audio_Name=audio_name, Audio=file)
    audio.save()

def handle_text_upload(user, file, pre_pro_name):
    validate_text_file(file)
    pre_pro = pre_pro(user=user, Pre_pro_Name=pre_pro_name, Pre_pro_audio=file)
    pre_pro.save()

def handle_video_upload(user, file, enhanced_name):
    validate_video_file(file)
    enhanced_audio = Enhanced_audio(user=user, Enhanced_Name=enhanced_name, Enhanced_audio=file)
    enhanced_audio.save()
