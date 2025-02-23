from django.contrib.auth.models import User
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from api.v1.files.models import FileModel


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_creations = models.ManyToManyField(FileModel, blank=True)
    user_profile_about = models.TextField(blank=True)
    user_profile_quote = models.TextField(blank=True, max_length=30)
    user_instagram_link = models.URLField(blank=True)
    user_telegram_link = models.URLField(blank=True)
    user_phone_number = PhoneNumberField()

    def __str__(self):
        return self.user.username
