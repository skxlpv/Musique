# admin.py
from __future__ import annotations

from django.contrib import admin

from .models import DocumentFileModel
from .models import FileModel
from .models import ImageFileModel
from .models import MusicFileModel


class FileModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'file_type', 'category', 'uploaded_at', 'author')
    list_filter = ('file_type', 'category', 'uploaded_at')
    search_fields = ('title', 'description')
    readonly_fields = ('file_type', 'uploaded_at', 'downloads_count')

    def delete_model(self, request, obj):
        obj.move_to_archive()

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.move_to_archive()

        super().delete_queryset(request, queryset)


class MusicFileModelAdmin(FileModelAdmin):
    list_display = FileModelAdmin.list_display + ('genre', 'bpm')
    list_filter = FileModelAdmin.list_filter + ('genre',)

    def delete_model(self, request, obj):
        obj.move_to_archive()

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.move_to_archive()

        super().delete_queryset(request, queryset)


class ImageFileModelAdmin(FileModelAdmin):
    list_display = FileModelAdmin.list_display + (
        'style',
        'medium',
        'width_px',
        'height_px',
    )
    list_filter = FileModelAdmin.list_filter + ('style', 'medium')

    def delete_model(self, request, obj):
        obj.move_to_archive()

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.move_to_archive()

        super().delete_queryset(request, queryset)


class DocumentFileModelAdmin(FileModelAdmin):
    list_display = FileModelAdmin.list_display + ('word_count', 'language')
    list_filter = FileModelAdmin.list_filter + ('language',)

    def delete_model(self, request, obj):
        obj.move_to_archive()

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.move_to_archive()

        super().delete_queryset(request, queryset)


# Register the models with custom admin classes
admin.site.register(FileModel, FileModelAdmin)
admin.site.register(MusicFileModel, MusicFileModelAdmin)
admin.site.register(ImageFileModel, ImageFileModelAdmin)
admin.site.register(DocumentFileModel, DocumentFileModelAdmin)
