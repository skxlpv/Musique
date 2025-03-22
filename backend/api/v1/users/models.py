from __future__ import annotations

from django.apps import apps
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

from backend import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        UserProfile = apps.get_model('users', 'UserProfile')
        user_profile_model = UserProfile.objects.create(user=user)
        user_profile_model.save()
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)


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
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    class Pronouns(models.TextChoices):
        HE = (
            'he',
            _('He/Him'),
        )
        SHE = (
            'she',
            _('She/Her'),
        )
        THEY = (
            'they',
            _('They/Them'),
        )
        ZE = (
            'ze',
            _('Ze/Zir'),
        )
        SHE_THEY = (
            'she_they',
            _('She/They'),
        )
        HE_THEY = (
            'he_they',
            _('He/They'),
        )
        ANY = (
            'any',
            _('Any'),
        )
        NONE = (
            'none',
            _('None'),
        )
        OTHER = (
            'other',
            _('Other'),
        )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    pronouns = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=Pronouns.choices,
    )
    custom_pronouns = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text='Specify your pronouns if not listed',
    )
    avatar = models.ImageField(upload_to='users/avatars/', blank=True)
    about = models.CharField(blank=True, default='', max_length=250)
    quote = models.CharField(blank=True, default='', max_length=30)

    favour_points = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
    )
    follows = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='followers',
        blank=True,
    )
    social_links = models.JSONField(default=dict, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        super().clean()
        if self.pronouns == self.Pronouns.OTHER and not self.custom_pronouns:
            raise ValidationError(
                {
                    'custom_pronouns': "Please specify your pronouns when selecting 'Other'",
                },
            )

    def __str__(self):
        return f"{self.user.username}'s Profile"

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
        ordering = ['-joined_at']
