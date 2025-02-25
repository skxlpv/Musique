from rest_framework import generics, status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from api.v1.user_profile.models import UserProfile
from api.v1.user_profile.serializers import UserProfileSerializer
from django.conf import settings


class UserProfileView(generics.GenericAPIView):
    serializer_class = UserProfileSerializer
    pagination_class = PageNumberPagination

    def get(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.filter(user=request.user).first()

        return Response(
            {
                "username": user_profile.user.username,
                "about": user_profile.about,
                "quote": user_profile.quote,
                "instagram_link": user_profile.instagram_link,
                "telegram_link": user_profile.telegram_link,
            }
        )

    def patch(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.filter(user=request.user).first()

        if not user_profile:
            return Response(
                {"error": "User profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data

        if "about" in data:
            user_profile.about = data["about"]
        if "quote" in data:
            user_profile.quote = data["quote"]
        if "instagram_link" in data:
            user_profile.instagram_link = data["instagram_link"]
        if "telegram_link" in data:
            user_profile.telegram_link = data["telegram_link"]

        user_profile.save()

        return Response(
            {
                "username": user_profile.user.username,
                "about": user_profile.about,
                "quote": user_profile.quote,
                "instagram_link": user_profile.instagram_link,
                "telegram_link": user_profile.telegram_link,
            },
            status=status.HTTP_200_OK
        )