from django.contrib import admin

from api.v1.files.models import (
    ArtistFileModel, MusicianFileModel, WriterFileModel
)


# Register your models here
@admin.register(ArtistFileModel)
class ArtistFileModelAdmin(admin.ModelAdmin):
    readonly_fields = ('filename', 'downloads_count', )

@admin.register(WriterFileModel)
class WriterFileModelAdmin(admin.ModelAdmin):
    readonly_fields = ('filename', 'downloads_count', )

@admin.register(MusicianFileModel)
class MusicianFileModelAdmin(admin.ModelAdmin):
    readonly_fields = ('filename', 'downloads_count', )