from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator

def validate_file_audio(value):
    valid_extensions = ['mp3', 'wav', 'ogg', 'flac', 'aac']
    validator = FileExtensionValidator(valid_extensions)
    validator(value)
def validate_file_video(value):
    import os
    from django.core.exceptions import ValidationError
    if os.path.getsize(value)> 100*1024*1024:
        raise ValidationError("The file is too large")
# def validate_file_video(value):
#     valid_extensions = ['mp4', 'avi', 'mov', 'flv', 'wmv']
#     validator = FileExtensionValidator(valid_extensions)
#     validator(value)
    
def get_video_subtitles(value):
        valid_extensions = ['mp4']
        if not any(value.name.endswith(ext) for ext in valid_extensions):
            raise ValidationError("Invalid file type: only .mp4 allowed.")

def handle_video_upload(user, file, video_name):
    validate_file_video(file)
    video = Video(Video_Name=video_name, Video=file)
    video.save()

# Create your models here.
class Account(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    Fname= models.CharField(max_length=100, default='')
    Lname= models.CharField(max_length=100, default='')
    DateofBirth = models.DateField(default='2000-01-01')
    profile_image = models.ImageField(upload_to='profile/', default='profile/default.jpg')


class Audio (models.Model):
    name = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audios/',validators=[validate_file_audio])
    Date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)  
    artist_name = models.CharField(max_length=100, default='')
    video= models.FileField(upload_to='videos/',validators=[validate_file_video], default='')  


class Pre_pro_audio(models.Model):
    name = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audios/',validators=[validate_file_audio])
    Date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)  
    artist_name = models.CharField(max_length=100, default='')
    video= models.FileField(upload_to='videos/',validators=[validate_file_video], default='')

class upscaled_audio(models.Model):
    name = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audios/',validators=[validate_file_audio])
    Date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)  
    artist_name = models.CharField(max_length=100, default='')
    video= models.FileField(upload_to='videos/',validators=[validate_file_video], default='')   

class RVC_Audio(models.Model):
    name = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audios/',validators=[validate_file_audio])
    Date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)  
    artist_name = models.CharField(max_length=100, default='')
    video= models.FileField(upload_to='videos/',validators=[validate_file_video], default='')     

class Enhanced_audio(models.Model):
    name = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audios/',validators=[validate_file_audio])
    Date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)  
    artist_name = models.CharField(max_length=100, default='')
    video= models.FileField(upload_to='videos/',validators=[validate_file_video], default='')     


class Evaluation(models.Model):
    Snr = models.IntegerField(default=0)
    MSQ = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    subjective_test = models.TextField(default='')
    Snr = models.IntegerField(default=0)
 
# class Video(models.Model):
#     Video_ID = models.AutoField(primary_key=True)
#     # user = models.ForeignKey(User, on_delete=models.CASCADE)
#     Video_Name = models.CharField(max_length=100)
#     Video = models.FileField(upload_to='videos/',validators=[validate_file_video],null=True, blank=True)   
#     size = models.IntegerField(null=True, blank=True)
#     date = models.DateField(auto_created=True,auto_now=True)
#     time = models.TimeField(auto_created=True,auto_now=True)   


def validate_file_video(value):
    import os
    from django.core.exceptions import ValidationError
    if os.path.getsize(value)> 100*1024*1024:
        raise ValidationError("The file is too large")

class Video(models.Model):
    Video_ID = models.AutoField(primary_key=True)
    Video_Name = models.CharField(max_length=100)
    Video = models.FileField(upload_to='videos/', validators=[validate_file_video], null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    date = models.DateField(auto_now=True)  # auto_now automatically sets the date on every save
    time = models.TimeField(auto_now=True)  # auto_now automatically sets the time on every save

    def save(self, *args, **kwargs):
        # Calculate and set the size of the video file before saving
        if self.Video:
            self.size = self.Video.size
        super(Video, self).save(*args, **kwargs)
