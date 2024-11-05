from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LoginSerializer
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

@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': True})
    return JsonResponse({'isAuthenticated': False}, status=401)