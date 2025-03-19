from django.urls import path, include

from apps.v1.api.views import logout, register
from apps.v1.dictionary.views import ChordApiView
from apps.v1.user_profile.views import UserProfileView
from apps.v1.files.views import FileUploadView

app_name = 'api_v1'

urlpatterns = [
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('chords/<str:root>', ChordApiView.as_view(), name='chords'),

    path('users/', include("apps.v1.users.urls"), name='users'),
    path('pages/', include("apps.v1.pages.urls"), name='pages'),
    path('user_profile/', UserProfileView.as_view(), name='my_profile'),
    path('upload-file/', FileUploadView.as_view(), name='upload_file'),
]
