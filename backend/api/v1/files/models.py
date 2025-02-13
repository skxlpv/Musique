from django.db import models
from datetime import datetime
import os
from api.v1.utils.model_choices import GENRE_CHOICES, LITERATURE_TYPE_CHOICES, INSTRUMENT_CHOICES


def get_upload_path(instance, filename):
    today = datetime.now()
    file_title = instance.title if instance.title else filename.split('.')[0]
    extension = filename.split('.')[-1]
    return os.path.join(f"{today.year}", f"{today.month}", f"{file_title}.{extension}")

#__________________________________UTIL MODELS___________________________________
class Subgenre(models.Model):
    subgenre = models.CharField(max_length=100)

    def __str__(self):
        return self.subgenre

class MusicianInstruments(models.Model):
    instrument_name = models.CharField(max_length=100, unique=True)

    @classmethod
    def populate_instruments(cls):
        for value, label in INSTRUMENT_CHOICES:
            if not cls.objects.filter(instrument_name=value).exists():
                cls.objects.create(instrument_name=value)

    def __str__(self):
        return self.instrument_name

class WriterLiteratureType(models.Model):
    literature_type = models.CharField(max_length=100)

    @classmethod
    def populate_literature_types(cls):
        for value, label in LITERATURE_TYPE_CHOICES:
            if not cls.objects.filter(literature_type=value).exists():
                cls.objects.create(literature_type=value)

    def __str__(self):
        return self.literature_type

class WriterGenreTypes(models.Model):
    genre = models.CharField(max_length=100)
    subgenres = models.ManyToManyField(Subgenre)

    @classmethod
    def populate_genre_types(cls):
        for genre_name, subgenre_list in GENRE_CHOICES:
            genre_obj, _ = cls.objects.get_or_create(genre=genre_name)
            for subgenre_value, _ in subgenre_list:
                subgenre_obj, _ = Subgenre.objects.get_or_create(subgenre=subgenre_value)
                genre_obj.subgenres.add(subgenre_obj)

    def __str__(self):
        return self.genre

#____________________________________MODELS______________________________________
class FileModel(models.Model):
    file = models.FileField(upload_to=get_upload_path, unique=True)
    filename = models.CharField(max_length=255, unique=True)
    #authors = models.ManyToManyField(CustomUser, related_name="%(app_label)s_%(class)s_authors")
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    is_downloadable = models.BooleanField(default=False)
    downloads_count = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title}"
        #by {', '.join([author.username for author in self.authors.all()])}")

    # def __init__(self, *args, **kwargs):
    #     model_name = self.__class__.__name__.lower()
    #     self._meta.get_field('authors').related_name = f"{model_name}_authors"
    #     super().__init__(*args, **kwargs)

class ArtistFileModel(FileModel):
    style = models.CharField(max_length=100)
    medium = models.CharField(max_length=100)
    height_px = models.PositiveIntegerField(default=0)
    width_px = models.PositiveIntegerField(default=0)
    height_cm = models.PositiveIntegerField(default=0)
    width_cm = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.title:
            self.filename = f"{self.title.replace(' ', '_')}.{self.file.name.split('.')[-1]}"
        else:
            self.filename = os.path.basename(self.file.name)

        super(ArtistFileModel, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-style']

    def __str__(self):
        return f"{self.title}"

class WriterFileModel(FileModel):
    genre = models.ManyToManyField(WriterGenreTypes)
    subgenre = models.ManyToManyField(Subgenre)
    literature_type = models.ManyToManyField(WriterLiteratureType, blank=False)
    word_count = models.PositiveIntegerField(default=0)
    language = models.CharField(max_length=100)

    class Meta:
        ordering = ['-title']

    def __str__(self):
        authors_list = ", ".join(str(author) for author in self.authors.all())
        return f"{self.title} by {authors_list}"

class MusicianFileModel(FileModel):
    genre = models.CharField(max_length=100)
    lyrics = models.TextField(blank=True, null=True)
    mood = models.CharField(max_length=100)
    instruments = models.ManyToManyField(MusicianInstruments, blank=True)
    duration = models.TimeField()
    bpm = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} by {self.authors.all()}"