import datetime
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, validate_password


# Create your models here.
def validate_audio_file(value):
        valid_extensions = ['mp3', 'wav', 'flac', 'ogg', 'm4a']
        if not any(value.name.endswith(ext) for ext in valid_extensions):
            raise ValidationError("Invalid file type: only .mp3, .wav, .flac, .ogg, .m4a allowed.")

def validate_text_file(value):
     valid_extensions = ['txt']
     if not any(value.name.endswith(ext) for ext in valid_extensions):
        raise ValidationError("Invalid file type: only .txt allowed.")

def validate_video_file(value):
    valid_extensions = ['mp4', 'avi', 'mov', 'flv', 'wmv']
    if not any(value.name.endswith(ext) for ext in valid_extensions):
        raise ValidationError("Invalid file type: only .mp4, .avi, .mov, .flv, .wmv allowed.")
    
def get_user_by_id(user_id):
    try:
        user = User.objects.get(id_number=user_id)
        return user
    except User.DoesNotExist:
        return None

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


class User(models.Model):
    id_number = models.AutoField(primary_key=True)
    Fname = models.CharField(max_length=100)
    Lname = models.CharField(max_length=100)
    username = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=128)
    Email = models.EmailField(unique=True,null=True, blank=True)
    Age = models.IntegerField(null=True, blank=True)
    Phone = models.BigIntegerField(null=True, blank=True)
    Address = models.CharField(max_length=100,null=True, blank=True)
    City = models.CharField(max_length=100,null=True, blank=True)
    Country = models.CharField(max_length=100,null=True, blank=True)
    Postal_Code = models.IntegerField(null=True, blank=True)
    user_image = models.ImageField(upload_to='uploads/profile_img/',null=True, blank=True)
    def clean(self):
        if not self.Fname:
            raise ValidationError("First name is required.")
        if not self.Lname:
            raise ValidationError("Last name is required.")
        if not self.username:
            raise ValidationError("Username is required.")
        if len(self.username) < 5:
            raise ValidationError("Username must be at least 5 characters long.")
        if not self.password:
            raise ValidationError("Password is required.")
        # Validate email
        validator = EmailValidator()
        try:
            validator(self.email)
        except ValidationError:
            raise ValidationError("Invalid email address.")
        
        # Validate password
        try:
            validate_password(self.password)
        except ValidationError as e:
            raise ValidationError("Invalid password: " + '; '.join(e.messages))
        


class Subscription(models.Model):
    Sub_ID = models.AutoField(primary_key=True)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Card_No = models.BigIntegerField()
    CVV = models.IntegerField()
    Card_Name = models.CharField(max_length=100, unique=True)
    End_Date = models.CharField(max_length=10)
    def clean(self):
        # Validate Card_No
        if not 15 < len(str(self.Card_No)) < 17:
            raise ValidationError("Card number must be 16 digits long.")
        
        # Validate CVV
        if not 2 < len(str(self.CVV)) < 5:
            raise ValidationError("CVV must be 3 or 4 digits long.")
        
        # Validate End_Date
        try:
            end_date = datetime.datetime.strptime(self.End_Date, '%m/%Y')
            if end_date < datetime.datetime.now():
                raise ValidationError("End date cannot be in the past.")
        except ValueError:
            raise ValidationError("End date must be in MM/YYYY format.")

class artist(models.Model):
    Artist_ID = models.AutoField(primary_key=True)
    Artist_Name = models.CharField(max_length=100,null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Artist_voice = models.FileField(upload_to='uploads/voice/',validators=[validate_audio_file],null=True, blank=True)
    Artist_image = models.ImageField(upload_to='uploads/artist_img/', null=True, blank=True)
    Artist_songs = models.FileField(upload_to='uploads/song/', validators=[validate_audio_file], null=True, blank=True)  
    song_lyrics = models.FileField(upload_to='uploads/lyrics/', validators=[validate_text_file], null=True, blank=True)

class Audio(models.Model):
    Audio_ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Audio_Name = models.CharField(max_length=100)
    Audio = models.FileField(upload_to='uploads/up_audio/',validators=[validate_audio_file],null=True, blank=True)   
    size = models.IntegerField(null=True, blank=True)
    date = models.DateField(auto_created=True,auto_now=True)
    time = models.TimeField(auto_created=True,auto_now=True)

class pre_pro(models.Model):
    Pre_pro_ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Pre_pro_Name = models.CharField(max_length=100,null=True, blank=True)
    Pre_pro_audio = models.FileField(upload_to='uploads/pre_audio/',validators=[validate_audio_file],null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    date = models.DateField(auto_created=True,auto_now=True)
    time = models.TimeField(auto_created=True,auto_now=True)

class Enhanced_audio(models.Model):
    Enhanced_ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Enhanced_Name = models.CharField(max_length=100)
    Enhanced_audio = models.FileField(upload_to='uploads/Enhanced_Audio/',validators=[validate_audio_file],null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    date = models.DateField(auto_created=True,auto_now=True)
    time = models.TimeField(auto_created=True,auto_now=True)