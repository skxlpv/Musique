from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator

from api.v1.user_profile.submodels.artist import Style, Medium
from api.v1.user_profile.submodels.craftsman import Material
from api.v1.user_profile.submodels.musician import Instrument, Genre, Band
from api.v1.user_profile.submodels.theatre_artist import TheatreCompany, TheatrePieceGenre
from api.v1.user_profile.submodels.writer import WriterGenre
from backend import settings


class SocialLink(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    platform = models.CharField(max_length=50)
    url = models.URLField()

    class Meta:
        unique_together = ('content_type', 'object_id', 'platform')


class UserProfile(models.Model):
    class Pronouns(models.TextChoices):
        HE = ('he', _('He/Him'),)
        SHE = ('she', _('She/Her'),)
        THEY = ('they', _('They/Them'),)
        ZE = ('ze', _('Ze/Zir'),)
        SHE_THEY = ('she_they', _('She/They'),)
        HE_THEY = ('he_they', _('He/They'),)
        ANY = ('any', _('Any'),)
        NONE = ('none', _('None'),)
        OTHER = ('other', _('Other'),)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_profile'
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
    joined_at = models.DateTimeField(auto_now_add=True)

    @property
    def first_name(self):
        return self.user.first_name

    @property
    def last_name(self):
        return self.user.last_name

    def clean(self):
        super().clean()
        if self.pronouns == self.Pronouns.OTHER and not self.custom_pronouns:
            raise ValidationError(
                {'custom_pronouns': "Please specify your pronouns when selecting 'Other'"},
            )

    class Meta:
        ordering = ['-joined_at']


class Musician(UserProfile):
    instruments = models.ManyToManyField(Instrument, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)
    bands = models.ManyToManyField(Band, blank=True)

    class Meta:
        verbose_name = 'Musician Profile'
        verbose_name_plural = 'Musician Profiles'

    def __str__(self):
        return f"{self.user.username}'s Musician Profile"


class Artist(UserProfile):
    styles = models.ManyToManyField(Style, blank=True)
    mediums = models.ManyToManyField(Medium, blank=True)

    class Meta:
        verbose_name = 'Artist Profile'
        verbose_name_plural = 'Artist Profiles'

    def __str__(self):
        return f"{self.user.username}'s Artist Profile"

class TheatreArtist(UserProfile):
    SPECIALTY_CHOICES = [
        ('actor', 'Actor'),
        ('director', 'Director'),
        ('playwright', 'Playwright'),
        ('designer', 'Designer'),
        ('other', 'Other'),
    ]

    specialty = models.CharField(max_length=20, choices=SPECIALTY_CHOICES)
    current_projects = models.ManyToManyField('TheatreProject', blank=True)
    theatre_companies = models.ManyToManyField(TheatreCompany, blank=True)
    preferred_genre = models.ManyToManyField(TheatrePieceGenre, blank=True, help_text="Theatre artist's preferred genre")


    class Meta:
        verbose_name = 'Theatre Artist Profile'
        verbose_name_plural = 'Theatre Artist Profiles'

    def __str__(self):
        return f"{self.user.username}'s Theatre Artist Profile"

class Writer(UserProfile):
    genres = models.ManyToManyField(WriterGenre, blank=True)
    influences = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = 'Writer Profile'
        verbose_name_plural = 'Writer Profiles'

    def __str__(self):
        return f"{self.user.username}'s Writer Profile"


class Craftsman(UserProfile):
    CRAFT_TYPE_CHOICES = [
        ('woodworking', 'Woodworking'),
        ('pottery', 'Pottery'),
        ('textiles', 'Textiles'),
        ('metalwork', 'Metalwork'),
        ('glassblowing', 'Glassblowing'),
        ('other', 'Other'),
    ]

    craft_type = models.CharField(max_length=20, choices=CRAFT_TYPE_CHOICES, help_text="Preferred user type of craft")
    materials = models.ManyToManyField(Material, blank=True)

    class Meta:
        verbose_name = 'Craftsman Profile'
        verbose_name_plural = 'Craftsman Profiles'

    def __str__(self):
        return f"{self.user.username}'s Craftsman Profile"