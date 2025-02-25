from django.conf import settings
from django.db import models

from api.v1.files.models import FileModel
from api.v1.users.models import CustomUser

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    about = models.CharField(blank=True, default='', max_length=250)
    quote = models.CharField(blank=True, default='', max_length=30)
    instagram_link = models.URLField(blank=True, default='', max_length=100)
    telegram_link = models.URLField(blank=True, default='', max_length=100)

    def __str__(self):
        return self.user.username
