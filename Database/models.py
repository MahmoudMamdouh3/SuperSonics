from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator

def validate_file_audio(value):
    valid_extensions = ['mp3', 'wav', 'ogg', 'flac', 'aac']
    validator = FileExtensionValidator(valid_extensions)
    validator(value)

def validate_file_video(value):
    valid_extensions = ['mp4', 'avi', 'mov', 'flv', 'wmv']
    validator = FileExtensionValidator(valid_extensions)
    validator(value)


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
 
   

    