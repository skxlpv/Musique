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
    field_labels = serializers.SerializerMethodField()

    class Meta:
        model = FileModel
        fields = [
            'id', 'file', 'file_url', 'title', 'description', 'category',
            'file_type', 'tags', 'tags_list', 'uploaded_at', 'is_downloadable',
            'downloads_count', 'author', 'author_name', 'is_featured', 'slug',
            'field_labels'
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

    def get_field_labels(self, obj):
        """Returns verbose names for all fields in the serializer"""
        model_class = obj._meta.model

        serializer_fields = set(self.Meta.fields)

        labels = {}
        for field_name in serializer_fields:
            try:
                field = model_class._meta.get_field(field_name)
                if hasattr(field, 'verbose_name'):
                    labels[field_name] = field.verbose_name
                elif field_name in ['field_labels', 'tags_list', 'file_url', 'author_name']:
                    continue
                else:
                    labels[field_name] = field_name.replace('_', ' ').title()
            except:
                labels[field_name] = field_name.replace('_', ' ').title()

        return labels

class VisualArtSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = VisualArtModel
        fields = FileModelSerializer.Meta.fields + [
            'style', 'medium', 'height_px', 'width_px',
            'dimensions_physical', 'creation_date'
        ]


class MusicSerializer(FileModelSerializer):
    cover_art = serializers.SerializerMethodField()

    class Meta(FileModelSerializer.Meta):
        model = MusicModel
        fields = FileModelSerializer.Meta.fields + [
            'cover_art', 'genre', 'bpm', 'duration_seconds', 'instruments',
            'lyrics', 'composer', 'recording_date'
        ]

    def get_cover_art(self, obj):
        if obj.cover_art:
            return self.context['request'].build_absolute_uri(obj.cover_art.url)
        return None


class WritingSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = WritingModel
        fields = FileModelSerializer.Meta.fields + [
            'word_count', 'language', 'genre',
            'publication_date', 'publisher', 'author_name'
        ]

    def create(self, validated_data):
        validated_data['category'] = 'writing'
        return super().create(validated_data)


class TheatreSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = TheatreModel
        fields = FileModelSerializer.Meta.fields + [
            'playwright', 'performance_date',
            'duration_minutes', 'cast_size', 'genre'
        ]

    def create(self, validated_data):
        validated_data['category'] = 'theatre'
        return super().create(validated_data)

class CraftsSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = CraftsModel
        fields = FileModelSerializer.Meta.fields + [
            'materials', 'difficulty_level',
            'time_required', 'tools_required', 'instructions'
        ]

    def create(self, validated_data):
        validated_data['category'] = 'crafts'
        return super().create(validated_data)