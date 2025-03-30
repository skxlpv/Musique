from __future__ import annotations

from django.apps import apps
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        UserProfile = apps.get_model('user_profile', 'UserProfile')
        user_profile = UserProfile.objects.create(user=user)
        user_profile.save()
        return user

    def create_superuser(self, username, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, first_name, last_name, password, **extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
    )
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def get_profile(self):
        """Get the user's main profile"""
        return self.user_profile

    def has_subprofile(self, profile_type):
        """Check if user has a specific subprofile type"""
        return self.user_profile.has_subprofile(profile_type)

    def get_subprofile(self, profile_type):
        """Get a specific subprofile if it exists"""
        return self.user_profile.get_subprofile(profile_type)

    def create_subprofile(self, profile_type, **kwargs):
        """Create a specialized subprofile"""
        return self.user_profile.create_subprofile(profile_type, **kwargs)

    def get_all_subprofiles(self):
        """Get all subprofiles for the user"""
        return self.user_profile.all_subprofiles

    def __str__(self):
        return self.username