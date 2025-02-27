from django.urls import path, include

from api.v1.apiv1.views import logout, register
from api.v1.dictionary.views import ChordApiView
from api.v1.user_profile.views import UserProfileView
from api.v1.files.views import FileUploadView

app_name = 'apiv1'

urlpatterns = [
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('chords/<str:root>', ChordApiView.as_view(), name='chords'),

    path('users/', include("api.v1.users.urls"), name='users'),
    path('pages/', include("api.v1.pages.urls"), name='pages'),
    path('user_profile/', UserProfileView.as_view(), name='my_profile'),
    path('upload-file/', FileUploadView.as_view(), name='upload_file'),
]
