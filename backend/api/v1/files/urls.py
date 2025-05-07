from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.files.views import (
    FileViewSet, VisualArtViewSet, MusicViewSet,
    WritingViewSet, TheatreViewSet, CraftsViewSet, FileUploadViewSet
)
from api.v1.files.views import get_user_files_by_username

router = DefaultRouter()
router.register(r'files', FileViewSet)
router.register(r'art-gallery', VisualArtViewSet)
router.register(r'music-gallery', MusicViewSet)
router.register(r'writings-gallery', WritingViewSet)
router.register(r'theatrical-gallery', TheatreViewSet)
router.register(r'craftspeople-gallery', CraftsViewSet)
router.register(r'upload', FileUploadViewSet, basename="upload")

urlpatterns = [
    path('', include(router.urls)),
    path('<str:username>/', get_user_files_by_username, name='files'),
]