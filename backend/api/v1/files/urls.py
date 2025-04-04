from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.files.views import (
    FileViewSet, VisualArtViewSet, MusicViewSet,
    WritingViewSet, TheatreViewSet, CraftsViewSet
)
from api.v1.files.views import get_user_files_by_username

router = DefaultRouter()
router.register(r'files', FileViewSet)
router.register(r'visual_art', VisualArtViewSet)
router.register(r'music', MusicViewSet)
router.register(r'writing', WritingViewSet)
router.register(r'theatre', TheatreViewSet)
router.register(r'crafts', CraftsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<str:username>/', get_user_files_by_username, name='files'),
]