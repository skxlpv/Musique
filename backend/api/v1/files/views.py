# views.py
from __future__ import annotations

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DocumentFileModel
from .models import FileModel
from .models import ImageFileModel
from .models import MusicFileModel
from .serializers import DocumentFileModelSerializer
from .serializers import FileModelSerializer
from .serializers import ImageFileModelSerializer
from .serializers import MusicFileModelSerializer

user = get_user_model()


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            file = request.data.get('file')
            if not file:
                raise ValidationError('No file was provided.')

            # Determine file type based on extension
            ext = file.name.split('.')[-1].lower()
            if ext in ['mp3', 'wav']:
                serializer_class = MusicFileModelSerializer
                model_class = MusicFileModel
            elif ext in ['jpg', 'jpeg', 'png', 'gif']:
                serializer_class = ImageFileModelSerializer
                model_class = ImageFileModel
            elif ext in ['pdf', 'doc', 'docx']:
                serializer_class = DocumentFileModelSerializer
                model_class = DocumentFileModel
            else:
                serializer_class = FileModelSerializer
                model_class = FileModel

            # Create a dictionary of all fields from the request data
            data = request.data.dict()  # Convert MultiValueDict to a regular dict
            data['file'] = file
            data['author'] = user.objects.get(pk=request.user.id)
            data['is_downloadable'] = data['is_downloadable'].capitalize()

            # Remove fields that are not part of the model
            model_fields = [f.name for f in model_class._meta.get_fields()]
            filtered_data = {k: v for k, v in data.items() if k in model_fields}

            # Create and save the file model
            file_model = model_class(**filtered_data)
            file_model.save()

            # Serialize the response
            serializer = serializer_class(file_model)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {
                    'error': 'An error occurred during file upload.',
                    'message': str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
