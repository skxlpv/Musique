from rest_framework import serializers
from apps.v1.user_profile.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['username', 'about', 'quote',
                  'instagram_link', 'telegram_link']

    def get_username(self, obj):
        return obj.user.username
