# serializers.py
from rest_framework import serializers
from .models import FileModel, MusicFileModel, ImageFileModel, DocumentFileModel

class FileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = [
            'id', 'file', 'title', 'description', 'category', 'file_type',
            'uploaded_at', 'is_downloadable', 'author',
        ]
        read_only_fields = ['id', 'uploaded_at', 'author', 'file_type']

class MusicFileModelSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = MusicFileModel
        fields = FileModelSerializer.Meta.fields + ['genre', 'bpm']

class ImageFileModelSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = ImageFileModel
        fields = FileModelSerializer.Meta.fields + ['style', 'medium', 'height_px', 'width_px']

class DocumentFileModelSerializer(FileModelSerializer):
    class Meta(FileModelSerializer.Meta):
        model = DocumentFileModel
        fields = FileModelSerializer.Meta.fields + ['word_count', 'language']