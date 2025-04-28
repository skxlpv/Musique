from __future__ import annotations

from django.contrib import admin

from .models import (
    FileModel, VisualArtModel, MusicModel,
    WritingModel, TheatreModel, CraftsModel
)


class FileModelAdmin(admin.ModelAdmin):
    """Base admin class for FileModel and its subclasses"""
    list_display = ('title', 'file_type', 'category', 'uploaded_at', 'author')
    list_filter = ('file_type', 'category', 'uploaded_at')
    search_fields = ('title', 'description')
    readonly_fields = ('file_type', 'uploaded_at', 'downloads_count', 'slug')

    def delete_model(self, request, obj):
        """Override delete to move file to archive first"""
        obj.move_to_archive()
        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        """Override bulk delete to move files to archive first"""
        for obj in queryset:
            obj.move_to_archive()
        super().delete_queryset(request, queryset)


class VisualArtModelAdmin(FileModelAdmin):
    """Admin for VisualArtModel"""
    list_display = FileModelAdmin.list_display + (
        'style',
        'medium',
        'width_px',
        'height_px',
    )
    list_filter = FileModelAdmin.list_filter + ('style', 'medium')


class MusicModelAdmin(FileModelAdmin):
    """Admin for MusicModel"""
    list_display = FileModelAdmin.list_display + ('genre', 'bpm')
    list_filter = FileModelAdmin.list_filter + ('genre',)


class WritingModelAdmin(FileModelAdmin):
    """Admin for WritingModel"""
    list_display = FileModelAdmin.list_display + ('word_count', 'language')
    list_filter = FileModelAdmin.list_filter + ('language',)


class TheatreModelAdmin(FileModelAdmin):
    """Admin for TheatreModel"""
    list_display = FileModelAdmin.list_display + (
        'playwright',
        'performance_date',
        'duration_minutes',
    )
    list_filter = FileModelAdmin.list_filter + ('genre',)


class CraftsModelAdmin(FileModelAdmin):
    """Admin for CraftsModel"""
    list_display = FileModelAdmin.list_display + (
        'materials',
        'difficulty_level',
        'time_required',
    )
    search_fields = FileModelAdmin.search_fields + ('instructions',)


# Register all models with their custom admin classes
admin.site.register(FileModel, FileModelAdmin)
admin.site.register(VisualArtModel, VisualArtModelAdmin)
admin.site.register(MusicModel, MusicModelAdmin)
admin.site.register(WritingModel, WritingModelAdmin)
admin.site.register(TheatreModel, TheatreModelAdmin)
admin.site.register(CraftsModel, CraftsModelAdmin)