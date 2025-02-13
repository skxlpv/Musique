from rest_framework import serializers

from api.v1.files.models import ArtistFileModel


class ArtistFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistFileModel
        fields = ['file', 'description', 'title', 'category', 'style', 'medium',
                  'height_cm', 'width_cm', 'height_px', 'width_px']
