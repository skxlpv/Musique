from __future__ import annotations

from api.v1.users.models import CustomUser
from api.v1.user_profile.models import UserProfile
from django.contrib import admin

# Register your models here.
admin.site.register(CustomUser)
