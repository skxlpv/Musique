from django.contrib import admin

from api.v1.user_profile.models import UserProfile

# Register your models here.
admin.site.register(UserProfile)