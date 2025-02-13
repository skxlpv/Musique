from django.urls import path

from api.v1.files.views import ArtistFileView

app_name = 'pages'

urlpatterns = [
    path('upload/', ArtistFileView.as_view(), name='file-upload'),
]
