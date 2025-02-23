import logging
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from api.v1.users.serializers import RegisterSerializer
from ..users.models import CustomUser

def get_user_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_user_token(user)
            response = Response({
                "message": f"User {serializer.data['username']} has been created successfully!",
                "token": tokens,
            }, status=status.HTTP_201_CREATED)
            response.set_cookie('access_token', tokens['access'], httponly=True, secure=True, samesite='None')
            response.set_cookie('refresh_token', tokens['refresh'], httponly=True, secure=True, samesite='None')
            return response
        raise ValidationError(serializer.errors)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            tokens = get_user_token(user)
            response = Response({
                'refresh': tokens['refresh'],
                'access': tokens['access'],
            }, status=status.HTTP_200_OK)
            print(response.data)
            response.set_cookie('access_token', tokens['access'], httponly=True, secure=True, samesite='None')
            response.set_cookie('refresh_token', tokens['refresh'], httponly=True, secure=True, samesite='None')
            return response
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            response = Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
            response.delete_cookie('access_token', path='/', domain=request.get_host())
            response.delete_cookie('refresh_token', path='/', domain=request.get_host())
            return response
        else:
            return Response({"message": "You are not logged in."}, status=status.HTTP_400_BAD_REQUEST)

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "isAuthenticated": True,
            "username": request.user.username,
            "email": request.user.email,
        }, status=200)
