import datetime
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

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
        
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
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