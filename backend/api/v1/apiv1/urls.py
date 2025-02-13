from django.urls import path, include

from api.v1.apiv1.views import RegisterUserView, LoginUserView, LogoutUserView
from api.v1.dictionary.views import ChordApiView
from api.v1.files.views import ArtistFileView

app_name = 'apiv1'

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('chords/<str:root>', ChordApiView.as_view(), name='chords'),

    path('users/', include("api.v1.users.urls"), name='users'),
    path('pages/', include("api.v1.pages.urls"), name='pages'),
    path('artist_documents/', ArtistFileView.as_view(), name='artist-documents'),
]
