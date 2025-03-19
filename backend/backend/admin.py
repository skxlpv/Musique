from django.contrib import admin

from apps.v1.users.models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
