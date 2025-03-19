# models.py
from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import FileExtensionValidator
from datetime import datetime
import os
import shutil
from django.conf import settings

user = get_user_model()


def get_upload_path(instance, filename):
    today = datetime.now()
    file_title = instance.title if instance.title else filename.split('.')[0]
    extension = filename.split('.')[-1]
    return os.path.join(f"{today.year}", f"{today.month}", f"{file_title}.{extension}")


def get_archive_path(file_path):
    # Create the archive path
    archive_path = os.path.join('archive', file_path)
    return archive_path


class FileModel(models.Model):
    FILE_TYPES = [
        ('image', 'Image'),
        ('audio', 'Audio'),
        ('document', 'Document'),
        ('pdf', 'PDF'),
        ('other', 'Other'),
    ]

    file = models.FileField(
        upload_to=get_upload_path,
        validators=[FileExtensionValidator(
            allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'mp3', 'wav', 'pdf', 'doc', 'docx'])]
    )
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    file_type = models.CharField(max_length=50, choices=FILE_TYPES, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_downloadable = models.BooleanField(default=False)
    downloads_count = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(user, on_delete=models.CASCADE, related_name="uploaded_files")

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'File'
        verbose_name_plural = 'Files'

    def __str__(self):
        return f"{self.title} by {self.author.username}"

    def save(self, *args, **kwargs):
        if not self.file_type:
            ext = self.file.name.split('.')[-1].lower()
            if ext in ['jpg', 'jpeg', 'png', 'gif']:
                self.file_type = 'image'
            elif ext in ['mp3', 'wav']:
                self.file_type = 'audio'
            elif ext in ['pdf']:
                self.file_type = 'pdf'
            elif ext in ['doc', 'docx']:
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
            print(f"Error moving file to archive {self.file.name}: {e}")
            return None


class MusicFileModel(FileModel):
    genre = models.CharField(max_length=100)
    bpm = models.PositiveIntegerField()


class ImageFileModel(FileModel):
    style = models.CharField(max_length=100)
    medium = models.CharField(max_length=100)
    height_px = models.PositiveIntegerField()
    width_px = models.PositiveIntegerField()


class DocumentFileModel(FileModel):
    word_count = models.PositiveIntegerField()
    language = models.CharField(max_length=100)