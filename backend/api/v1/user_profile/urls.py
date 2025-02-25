from django.urls import path, include

from api.v1.user_profile.views import UserProfileView

app_name = 'user_profile'

urlpatterns = [
    path('me/', UserProfileView.as_view(), name='my_profile'),
]
