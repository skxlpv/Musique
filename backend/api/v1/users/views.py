from __future__ import annotations

from api.v1.users.models import CustomUser
from api.v1.users.models import UserProfile
from api.v1.users.serializers import UserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    pagination_class = PageNumberPagination


class UserProfileView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            user_profile, created = UserProfile.objects.get_or_create(
                user=request.user,
            )
            avatar_url = user_profile.avatar.url if user_profile.avatar else None

            response_data = {
                'username': user_profile.user.username,
                "first_name": user_profile.first_name,
                "last_name": user_profile.last_name,
                'email': user_profile.user.email,
                'about': user_profile.about,
                'quote': user_profile.quote,
                'pronouns': user_profile.get_pronouns_display(),
                'custom_pronouns': user_profile.custom_pronouns,
                'avatar': avatar_url,
                'social_links': user_profile.social_links,
                'joined_at': user_profile.joined_at,
                'favour_points': user_profile.favour_points,
            }

            return Response(
                response_data,
            )
        except Exception:
            return Response(
                {'error': 'Could not retrieve user data'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request, *args, **kwargs):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            data = request.data
            allowed_fields = [
                'about',
                'quote',
                'instagram_link',
                'telegram_link',
            ]

            for field in allowed_fields:
                if field in data:
                    setattr(user_profile, field, data[field])
            user_profile.save()

            return Response(
                {
                    'username': request.user.username,
                    'about': user_profile.about,
                    'quote': user_profile.quote,
                    'instagram_link': user_profile.instagram_link,
                    'telegram_link': user_profile.telegram_link,
                },
                status=status.HTTP_200_OK,
            )
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                {'error': 'Update failed'},
                status=status.HTTP_400_BAD_REQUEST,
            )
