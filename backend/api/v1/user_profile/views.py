from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.v1.user_profile.models import UserProfile
from api.v1.users.serializers import UserSerializer


# Create your views here.
class UserProfileView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        try:
            user_profile, created = UserProfile.objects.get_or_create(
                user=request.user,
            )
            avatar_url = user_profile.avatar.url if user_profile.avatar else None

            sub_profiles_data = []

            for sub_profile in user_profile.all_subprofiles:
                fields = {field.name: field for field in sub_profile._meta.fields
                          if not field.is_relation and field.name != 'id'}

                sub_profile_data = {
                    'id': sub_profile.id,
                    'profile_name': sub_profile.__class__.__name__,
                    'content': {},
                }

                for field_name, field in fields.items():
                    value = getattr(sub_profile, field_name)
                    if hasattr(value, 'url'):  # For FileField/ImageField
                        value = value.url if value else None
                    sub_profile_data['content'][field_name] = value

                for field in sub_profile._meta.many_to_many:
                    related_objects = getattr(sub_profile, field.name).all()
                    sub_profile_data['content'][field.name] = [obj.id for obj in related_objects]

                sub_profiles_data.append(sub_profile_data)

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
                'joined_at': user_profile.joined_at,
                'favour_points': user_profile.favour_points,
                'sub_profiles' : sub_profiles_data,
            }

            return Response(
                response_data,
            )
        except Exception:
            return Response(
                {'error': 'Could not retrieve user data'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )