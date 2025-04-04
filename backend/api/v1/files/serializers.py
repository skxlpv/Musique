from rest_framework import serializers
from .models import (
    FileModel,
    VisualArtModel,
    MusicModel,
    WritingModel,
    TheatreModel,
    CraftsModel
)


class FileModelSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    file_url = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = FileModel
        fields = [
            'id', 'file', 'file_url', 'title', 'description', 'category',
            'file_type', 'tags', 'tags_list', 'uploaded_at', 'is_downloadable',
            'downloads_count', 'author', 'author_name', 'is_featured'
        ]
        read_only_fields = ['downloads_count', 'uploaded_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url') and request:
            return request.build_absolute_uri(obj.file.url)
        return None

    def get_tags_list(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(',')]
        return []


class VisualArtSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = VisualArtModel
        fields = FileModelSerializer.Meta.fields + [
            'style', 'medium', 'height_px', 'width_px',
            'dimensions_physical', 'creation_date'
        ]


class MusicSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = MusicModel
        fields = FileModelSerializer.Meta.fields + [
            'genre', 'bpm', 'duration_seconds', 'instruments',
            'lyrics', 'composer', 'recording_date'
        ]


class WritingSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = WritingModel
        fields = FileModelSerializer.Meta.fields + [
            'word_count', 'language', 'genre',
            'publication_date', 'publisher'
        ]


class TheatreSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = TheatreModel
        fields = FileModelSerializer.Meta.fields + [
            'playwright', 'performance_date',
            'duration_minutes', 'cast_size', 'genre'
        ]


class CraftsSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = CraftsModel
        fields = FileModelSerializer.Meta.fields + [
            'materials', 'difficulty_level',
            'time_required', 'tools_required', 'instructions'
        ]