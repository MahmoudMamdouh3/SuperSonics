from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

#admin.site.register(User)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'password')  # Customize the fields displayed in the user list

admin.site.register(Account, UserAdmin)
admin.site.register(Audio)
admin.site.register(Pre_pro_audio)
admin.site.register(Enhanced_audio)
admin.site.register(upscaled_audio)
admin.site.register(RVC_Audio)  
admin.site.register(Evaluation)
