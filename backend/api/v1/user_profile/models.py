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

    class ProfileType(models.TextChoices):
        DEFAULT = 'default', _('Default')
        MUSICIAN = 'musician', _('Musician')
        ARTIST = 'artist', _('Artist')
        THEATRE = 'theatre', _('Theatre Artist')
        WRITER = 'writer', _('Writer')
        CRAFTSMAN = 'craftsman', _('Craftsman')

    profile_type = models.CharField(
        max_length=20,
        choices=ProfileType.choices,
        default=ProfileType.DEFAULT
    )

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

    @property
    def all_subprofiles(self):
        """Return all subprofiles associated with this profile"""
        subprofiles = []

        if hasattr(self, 'musician_profiles'):
            subprofiles.extend(self.musician_profiles.all())
        if hasattr(self, 'artist_profiles'):
            subprofiles.extend(self.artist_profiles.all())
        if hasattr(self, 'theatre_artist_profiles'):
            subprofiles.extend(self.theatre_artist_profiles.all())
        if hasattr(self, 'writer_profiles'):
            subprofiles.extend(self.writer_profiles.all())
        if hasattr(self, 'craftsman_profiles'):
            subprofiles.extend(self.craftsman_profiles.all())

        return subprofiles

    def clean(self):
        super().clean()
        if self.pronouns == self.Pronouns.OTHER and not self.custom_pronouns:
            raise ValidationError(
                {'custom_pronouns': "Please specify your pronouns when selecting 'Other'"},
            )

    def create_subprofile(self, profile_type, **kwargs):
        """Create a new subprofile of the specified type for this profile"""
        model_map = {
            self.ProfileType.MUSICIAN: MusicianProfile,
            self.ProfileType.ARTIST: ArtistProfile,
            self.ProfileType.THEATRE: TheatreArtistProfile,
            self.ProfileType.WRITER: WriterProfile,
            self.ProfileType.CRAFTSMAN: CraftsmanProfile,
        }

        if profile_type not in model_map:
            raise ValueError(f"Invalid profile type: {profile_type}")

        # Check if profile already exists
        if self.has_subprofile(profile_type):
            raise ValidationError(f"User already has a {profile_type} profile")

        profile_class = model_map[profile_type]
        subprofile = profile_class(main_profile=self, **kwargs)
        subprofile.save()
        return subprofile

    def has_subprofile(self, profile_type):
        """Check if profile has a specific subprofile type"""
        related_name_map = {
            self.ProfileType.MUSICIAN: 'musician_profiles',
            self.ProfileType.ARTIST: 'artist_profiles',
            self.ProfileType.THEATRE: 'theatre_artist_profiles',
            self.ProfileType.WRITER: 'writer_profiles',
            self.ProfileType.CRAFTSMAN: 'craftsman_profiles',
        }

        if profile_type not in related_name_map:
            raise ValueError(f"Invalid profile type: {profile_type}")

        related_name = related_name_map[profile_type]
        return getattr(self, related_name).exists()

    def get_subprofile(self, profile_type):
        """Get a specific subprofile if it exists"""
        related_name_map = {
            self.ProfileType.MUSICIAN: 'musician_profiles',
            self.ProfileType.ARTIST: 'artist_profiles',
            self.ProfileType.THEATRE: 'theatre_artist_profiles',
            self.ProfileType.WRITER: 'writer_profiles',
            self.ProfileType.CRAFTSMAN: 'craftsman_profiles',
        }

        if profile_type not in related_name_map:
            raise ValueError(f"Invalid profile type: {profile_type}")

        related_name = related_name_map[profile_type]
        return getattr(self, related_name).first()

    class Meta:
        ordering = ['-joined_at']


# Changed from subclass to standalone models with FKs to main profile

class MusicianProfile(models.Model):
    main_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='musician_profiles'
    )
    instruments = models.ManyToManyField(Instrument, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)
    bands = models.ManyToManyField(Band, blank=True)

    class Meta:
        verbose_name = 'Musician Profile'
        verbose_name_plural = 'Musician Profiles'
        # Add constraint to ensure uniqueness
        constraints = [
            models.UniqueConstraint(fields=['main_profile'], name='unique_musician_profile')
        ]

    def __str__(self):
        return f"{self.main_profile.user.username}'s Musician Profile"


class ArtistProfile(models.Model):
    main_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='artist_profiles'
    )
    styles = models.ManyToManyField(Style, blank=True)
    mediums = models.ManyToManyField(Medium, blank=True)

    class Meta:
        verbose_name = 'Artist Profile'
        verbose_name_plural = 'Artist Profiles'
        # Add constraint to ensure uniqueness
        constraints = [
            models.UniqueConstraint(fields=['main_profile'], name='unique_artist_profile')
        ]

    def __str__(self):
        return f"{self.main_profile.user.username}'s Artist Profile"


class TheatreArtistProfile(models.Model):
    SPECIALTY_CHOICES = [
        ('actor', 'Actor'),
        ('director', 'Director'),
        ('playwright', 'Playwright'),
        ('designer', 'Designer'),
        ('other', 'Other'),
    ]

    main_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='theatre_artist_profiles'
    )
    specialty = models.CharField(max_length=20, choices=SPECIALTY_CHOICES)
    current_projects = models.ManyToManyField('TheatreProject', blank=True)
    theatre_companies = models.ManyToManyField(TheatreCompany, blank=True)
    preferred_genre = models.ManyToManyField(TheatrePieceGenre, blank=True,
                                             help_text="Theatre artist's preferred genre")

    class Meta:
        verbose_name = 'Theatre Artist Profile'
        verbose_name_plural = 'Theatre Artist Profiles'
        # Add constraint to ensure uniqueness
        constraints = [
            models.UniqueConstraint(fields=['main_profile'], name='unique_theatre_artist_profile')
        ]

    def __str__(self):
        return f"{self.main_profile.user.username}'s Theatre Artist Profile"


class WriterProfile(models.Model):
    main_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='writer_profiles'
    )
    genres = models.ManyToManyField(WriterGenre, blank=True)
    influences = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = 'Writer Profile'
        verbose_name_plural = 'Writer Profiles'
        # Add constraint to ensure uniqueness
        constraints = [
            models.UniqueConstraint(fields=['main_profile'], name='unique_writer_profile')
        ]

    def __str__(self):
        return f"{self.main_profile.user.username}'s Writer Profile"


class CraftsmanProfile(models.Model):
    CRAFT_TYPE_CHOICES = [
        ('woodworking', 'Woodworking'),
        ('pottery', 'Pottery'),
        ('textiles', 'Textiles'),
        ('metalwork', 'Metalwork'),
        ('glassblowing', 'Glassblowing'),
        ('other', 'Other'),
    ]

    main_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='craftsman_profiles'
    )
    craft_type = models.CharField(max_length=20, choices=CRAFT_TYPE_CHOICES, help_text="Preferred user type of craft")
    materials = models.ManyToManyField(Material, blank=True)

    class Meta:
        verbose_name = 'Craftsman Profile'
        verbose_name_plural = 'Craftsman Profiles'
        # Add constraint to ensure uniqueness
        constraints = [
            models.UniqueConstraint(fields=['main_profile'], name='unique_craftsman_profile')
        ]

    def __str__(self):
        return f"{self.main_profile.user.username}'s Craftsman Profile"