# views.py
from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters, permissions, status
from rest_framework.decorators import permission_classes, api_view, action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from unicodedata import category

from .models import (
    FileModel,
    VisualArtModel,
    MusicModel,
    WritingModel,
    TheatreModel,
    CraftsModel
)
from .serializers import (
    FileModelSerializer,
    VisualArtSerializer,
    MusicSerializer,
    WritingSerializer,
    TheatreSerializer,
    CraftsSerializer
)
from ..api.serializers import FileSerializer
user = get_user_model()

class BaseFileViewSet(viewsets.ModelViewSet):
    """Base ViewSet for file operations"""
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'tags', 'author__username']
    ordering_fields = ['uploaded_at', 'title', 'downloads_count']
    pagination_class = PageNumberPagination

    lookup_field = 'slug'
    lookup_value_regex = '[-\w]+'

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        file_type = request.query_params.get('file_type') if hasattr(request, 'query_params') else request.GET.get(
            'file_type')
        if file_type:
            queryset = queryset.filter(file_type=file_type)

        tag = request.query_params.get('tag') if hasattr(request, 'query_params') else request.GET.get('tag')
        if tag:
            queryset = queryset.filter(tags__icontains=tag)

        is_featured = request.query_params.get('featured') if hasattr(request, 'query_params') else request.GET.get(
            'featured')
        if is_featured in ['true', 'True', '1']:
            queryset = queryset.filter(is_featured=True)

        # Search query
        query = request.query_params.get('q') if hasattr(request, 'query_params') else request.GET.get('q')
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(tags__icontains=query) |
                Q(author__username__icontains=query)
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class FileViewSet(BaseFileViewSet):
    """ViewSet for general file operations"""
    queryset = FileModel.objects.all()
    serializer_class = FileModelSerializer


class VisualArtViewSet(BaseFileViewSet):
    """ViewSet for visual art files"""
    queryset = VisualArtModel.objects.all()
    serializer_class = VisualArtSerializer


class MusicViewSet(BaseFileViewSet):
    """ViewSet for music files"""
    queryset = MusicModel.objects.all()
    serializer_class = MusicSerializer


class WritingViewSet(BaseFileViewSet):
    """ViewSet for writing files"""
    queryset = WritingModel.objects.all()
    serializer_class = WritingSerializer


class TheatreViewSet(BaseFileViewSet):
    """ViewSet for theatre files"""
    queryset = TheatreModel.objects.all()
    serializer_class = TheatreSerializer


class CraftsViewSet(BaseFileViewSet):
    """ViewSet for crafts files"""
    queryset = CraftsModel.objects.all()
    serializer_class = CraftsSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_files_by_username(request, username):
    files = FileModel.objects.filter(author=get_user_model().objects.get(username=username))
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

class FileUploadViewSet(ViewSet):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        try:
            file = request.data.get('file')
            if not file:
                raise ValidationError("No file was provided.")

            ext = file.name.split('.')[-1].lower()
            category = request.data.get('category', '').lower()

            # Handle document types
            if ext in ['doc', 'docx', 'rtf', 'txt']:
                category = 'writing'
                serializer_class = WritingSerializer
            elif ext == 'pdf':
                if category == 'theatre':
                    serializer_class = TheatreSerializer
                elif category == 'crafts':
                    serializer_class = CraftsSerializer
                else:
                    category = 'undefined'
                    serializer_class = FileModelSerializer
            elif ext in ['mp3', 'wav']:
                category = 'music'
                serializer_class = MusicSerializer
                cover_art = request.data.get('cover_art')
                if cover_art:
                    request.data._mutable = True
                    request.data['cover_art'] = cover_art
                    request.data._mutable = False
            elif ext in ['jpg', 'jpeg', 'png', 'gif']:
                category = 'visual_art'
                serializer_class = VisualArtSerializer
            else:
                category = 'other'
                serializer_class = FileModelSerializer

            # Create mutable copy of request data
            data = request.data.copy()
            data['category'] = category
            data['author'] = request.user.id

            serializer = serializer_class(data=data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occurred", "details": str(e)},
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)