from __future__ import annotations

from api.v1.api.views import logout
from api.v1.api.views import register
from api.v1.dictionary.views import ChordApiView
from api.v1.files.views import FileUploadView
from django.urls import include
from django.urls import path

app_name = 'api_v1'

urlpatterns = [
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('chords/<str:root>', ChordApiView.as_view(), name='chords'),
    path('users/', include('api.v1.users.urls'), name='users'),
    path('pages/', include('api.v1.pages.urls'), name='pages'),
    path('upload-file/', FileUploadView.as_view(), name='upload_file'),
]
