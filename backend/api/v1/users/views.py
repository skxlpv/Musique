from __future__ import annotations

from rest_framework.decorators import permission_classes, api_view

from api.v1.api.serializers import FileSerializer
from api.v1.files.models import FileModel
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_files(request):
    files = FileModel.objects.filter(author=request.user)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)