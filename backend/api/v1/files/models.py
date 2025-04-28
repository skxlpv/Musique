import os
from datetime import datetime

from autoslug.fields import AutoSlugField
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
        verbose_name="File",
        help_text="Upload your artwork file"
    )
    title = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Title",
        help_text="Title of your artwork"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description",
        help_text="Detailed description of your artwork"
    )
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        default='other',
        verbose_name="Category",
        help_text="Artwork category"
    )
    file_type = models.CharField(
        max_length=50,
        choices=FILE_TYPES,
        blank=True,
        null=True,
        verbose_name="File Type",
        help_text="Type of the uploaded file"
    )
    slug = AutoSlugField(
        populate_from='title',
        verbose_name="Slug",
        help_text="URL-friendly version of the title"
    )
    tags = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Tags",
        help_text="Comma-separated tags for better discoverability"
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Upload Date",
        help_text="Date and time when the artwork was uploaded"
    )
    is_downloadable = models.BooleanField(
        default=False,
        verbose_name="Downloadable",
        help_text="Allow others to download this file"
    )
    downloads_count = models.PositiveIntegerField(
        default=0,
        verbose_name="Download Count",
        help_text="Number of times this file has been downloaded"
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='uploaded_files',
        verbose_name="Author",
        help_text="Creator of this artwork"
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name="Featured",
        help_text="Mark as featured artwork"
    )

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Artwork'
        verbose_name_plural = 'Artworks'

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
    style = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Art Style",
        help_text="Artistic style (e.g., realism, abstract)"
    )
    medium = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Medium",
        help_text="Materials used (e.g., oil, watercolor, digital)"
    )
    height_px = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Height (px)",
        help_text="Height in pixels"
    )
    width_px = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Width (px)",
        help_text="Width in pixels"
    )
    dimensions_physical = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Physical Dimensions",
        help_text="Physical dimensions (e.g., '24x36 inches')"
    )
    creation_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Creation Date",
        help_text="When the artwork was created"
    )

    class Meta:
        verbose_name = 'Visual Artwork'
        verbose_name_plural = 'Visual Artworks'


class MusicModel(FileModel):
    cover_art = models.ImageField(
        upload_to=get_cover_art_upload_path,
        blank=True,
        verbose_name="Cover Art",
        help_text="Album or track cover image"
    )
    genre = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Music Genre",
        help_text="Genre of the music (e.g., rock, jazz)"
    )
    bpm = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Beats Per Minute",
        help_text="Tempo of the music"
    )
    duration_seconds = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Duration (seconds)",
        help_text="Length of the track in seconds"
    )
    instruments = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Instruments Used",
        help_text="List of instruments featured"
    )
    lyrics = models.TextField(
        blank=True,
        verbose_name="Lyrics",
        help_text="Song lyrics (if applicable)"
    )
    composer = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Composer",
        help_text="Person who composed the music"
    )
    recording_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Recording Date",
        help_text="When the track was recorded"
    )

    class Meta:
        verbose_name = 'Music Track'
        verbose_name_plural = 'Music Tracks'


class WritingModel(FileModel):
    word_count = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Word Count",
        help_text="Approximate number of words"
    )
    language = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Language",
        help_text="Language the work is written in"
    )
    genre = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Literary Genre",
        help_text="Genre of the writing (e.g., fiction, poetry)"
    )
    publication_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Publication Date",
        help_text="When the work was published"
    )
    publisher = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Publisher",
        help_text="Publishing company or platform"
    )

    class Meta:
        verbose_name = 'Written Work'
        verbose_name_plural = 'Written Works'


class TheatreModel(FileModel):
    playwright = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Playwright",
        help_text="Author of the theatrical work"
    )
    performance_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Performance Date",
        help_text="Date of the performance"
    )
    duration_minutes = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Duration (minutes)",
        help_text="Length of the performance"
    )
    cast_size = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Cast Size",
        help_text="Number of performers"
    )
    genre = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Theatrical Genre",
        help_text="Genre of the performance"
    )
    period = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Historical Period",
        help_text="Time period the work represents"
    )
    theme = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Theme",
        help_text="Central theme or message"
    )

    class Meta:
        verbose_name = 'Theatrical Work'
        verbose_name_plural = 'Theatrical Works'


class CraftsModel(FileModel):
    DIFFICULTY = [
        ('begginer', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('master', 'Master'),
    ]

    materials = models.TextField(
        blank=True,
        verbose_name="Materials",
        help_text="List of materials needed"
    )
    difficulty_level = models.CharField(
        max_length=50,
        blank=True,
        choices=DIFFICULTY,
        verbose_name="Difficulty Level",
        help_text="Beginner, Intermediate, or Advanced"
    )
    time_required = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Time Required",
        help_text="Estimated time to complete"
    )
    tools_required = models.TextField(
        blank=True,
        verbose_name="Tools Required",
        help_text="List of tools needed"
    )
    instructions = models.TextField(
        blank=True,
        verbose_name="Instructions",
        help_text="Step-by-step instructions"
    )

    class Meta:
        verbose_name = 'Craft Project'
        verbose_name_plural = 'Craft Projects'