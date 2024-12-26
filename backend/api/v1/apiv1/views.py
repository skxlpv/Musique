from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from api.v1.users.serializers import RegisterSerializer
from ..users.models import CustomUser
from django.contrib.auth.tokens import default_token_generator

logger = logging.getLogger(__name__)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info(f"Received data: {request.data}")
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": f"User {serializer.data['username']} has been created successfully!"},
                            status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = CustomUser.objects.filter(username=request.data['username']).first()

        if user and check_password(request.data['password'], user.password):
            login(request, user)

            # Generate a token and set as an HTTPOnly cookie
            token = default_token_generator.make_token(user)
            response = Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='auth_token',
                value=token,
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age = 1800
            )

            logger.info(f"User {user.username} logged in successfully.")
            return response

        return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
        response.delete_cookie('auth_token')
        logger.info("User logged out successfully.")
        return response


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        file = request.FILES['file'] if "file" in request.data else None

        if file is not None:
            FileModel.objects.create(
                user=CustomUser.objects.get(username="skxlpv"),
                file=file,
            )
            return Response({"message": "File uploaded successfully!"}, status=201)
