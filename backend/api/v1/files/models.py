import os
import shutil
from datetime import datetime

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models

User = get_user_model()


def get_upload_path(instance, filename):
    today = datetime.now()
    file_title = instance.title if instance.title else filename.split('.')[0]
    extension = filename.split('.')[-1]
    category_folder = instance.category.lower().replace(' ', '_')
    return os.path.join(
        category_folder,
        f'{today.year}',
        f'{today.month}',
        f'{file_title}',
        f'{file_title}.{extension}',
    )

def get_cover_art_upload_path(instance, filename):
    today = datetime.now()
    category_folder = instance.category.lower().replace(' ', '_')
    file_title = instance.title
    extension = filename.split('.')[-1]
    return os.path.join(
        category_folder,
        f'{today.year}',
        f'{today.month}',
        file_title,
        f'cover_art.{extension}'
    )

def get_archive_path(file_path):
    archive_path = os.path.join('archive', file_path)
    return archive_path


class FileModel(models.Model):
    """Base file model for all artistic works"""

    CATEGORY_CHOICES = [
        ('visual_art', 'Visual Art'),
        ('music', 'Music'),
        ('writing', 'Writing'),
        ('theatre', 'Theatre'),
        ('crafts', 'Crafts'),
        ('other', 'Other'),
    ]

    FILE_TYPES = [
        ('image', 'Image'),
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('document', 'Document'),
        ('pdf', 'PDF'),
        ('other', 'Other'),
    ]

    file = models.FileField(
        upload_to=get_upload_path,
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    # Images
                    'jpg', 'jpeg', 'png', 'gif', 'svg',
                    # Audio
                    'mp3', 'wav', 'ogg', 'flac',
                    # Video
                    'mp4', 'mov', 'avi', 'webm',
                    # Documents
                    'pdf', 'doc', 'docx', 'txt', 'rtf',
                    # Other
                    'zip', 'rar',
                ],
            ),
        ],
    )
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='other')
    file_type = models.CharField(
        max_length=50,
        choices=FILE_TYPES,
        blank=True,
        null=True,
    )
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_downloadable = models.BooleanField(default=False)
    downloads_count = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='uploaded_files',
    )
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'File'
        verbose_name_plural = 'Files'

    def __str__(self):
        return f'{self.title} by {self.author.username}'

    def save(self, *args, **kwargs):
        if not self.title and self.file:
            filename = os.path.basename(self.file.name)
            self.title = os.path.splitext(filename)[0]

        if not self.file_type:
            ext = self.file.name.split('.')[-1].lower()
            if ext in ['jpg', 'jpeg', 'png', 'gif', 'svg']:
                self.file_type = 'image'
            elif ext in ['mp3', 'wav', 'ogg', 'flac']:
                self.file_type = 'audio'
            elif ext in ['mp4', 'mov', 'avi', 'webm']:
                self.file_type = 'video'
            elif ext in ['pdf']:
                self.file_type = 'pdf'
            elif ext in ['doc', 'docx', 'txt', 'rtf']:
                self.file_type = 'document'
            else:
                self.file_type = 'other'
        super().save(*args, **kwargs)

    def move_to_archive(self):
        """
        Move the file to an archive directory and manually delete from original location
        Returns the archive path if successful, None otherwise
        """
        if not self.file:
            return None

        try:
            # Get the source file's path
            source_path = self.file.path
            source_name = self.file.name

            # Only proceed if the file exists
            if not os.path.exists(source_path):
                return None

            # Create the archive path
            archive_path = get_archive_path(source_name)

            # Get the full file system path for archive destination
            full_archive_path = os.path.join(settings.MEDIA_ROOT, archive_path)

            # Create archive directory if it doesn't exist
            os.makedirs(os.path.dirname(full_archive_path), exist_ok=True)

            # Copy the file to the archive
            shutil.copy2(source_path, full_archive_path)

            # Manually delete the original file
            os.remove(source_path)

            return archive_path
        except Exception as e:
            print(f'Error moving file to archive {self.file.name}: {e}')
            return None


class VisualArtModel(FileModel):
    """Model for visual arts (paintings, photography, digital art, etc.)"""
    style = models.CharField(max_length=100, blank=True)
    medium = models.CharField(max_length=100, blank=True)
    height_px = models.PositiveIntegerField(null=True, blank=True)
    width_px = models.PositiveIntegerField(null=True, blank=True)
    dimensions_physical = models.CharField(max_length=100, blank=True,
                                           help_text="Physical dimensions (e.g. '24x36 inches')")
    creation_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.category = 'visual_art'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} by {self.author.username}'


class MusicModel(FileModel):
    """Model for music works (songs, compositions, etc.)"""
    cover_art = models.ImageField(upload_to=get_cover_art_upload_path, blank=True)
    genre = models.CharField(max_length=100, blank=True)
    bpm = models.PositiveIntegerField(null=True, blank=True)
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    instruments = models.CharField(max_length=255, blank=True)
    lyrics = models.TextField(blank=True)
    composer = models.CharField(max_length=100, blank=True)
    recording_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.category = 'music'
        self.file_type = 'audio'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} by {self.composer}'


class WritingModel(FileModel):
    """Model for written works (essays, books, poetry, etc.)"""
    word_count = models.PositiveIntegerField(null=True, blank=True)
    language = models.CharField(max_length=100, blank=True)
    genre = models.CharField(max_length=100, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    publisher = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        self.category = 'writing'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} by {self.author} ({self.publisher})'


class TheatreModel(FileModel):
    """Model for theatre works (scripts, performances, etc.)"""
    playwright = models.CharField(max_length=100, blank=True)
    performance_date = models.DateField(null=True, blank=True)
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)
    cast_size = models.PositiveIntegerField(null=True, blank=True)
    genre = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        self.category = 'theatre'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} by {self.playwright}'


class CraftsModel(FileModel):
    """Model for crafts works (DIY instructions, patterns, etc.)"""
    materials = models.TextField(blank=True)
    difficulty_level = models.CharField(max_length=50, blank=True)
    time_required = models.CharField(max_length=100, blank=True)
    tools_required = models.TextField(blank=True)
    instructions = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        self.category = 'crafts'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} by {self.author.username}'