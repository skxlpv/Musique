from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.models import AnonymousUser
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.v1.api_v1.serializers import RegisterSerializer

User = get_user_model()

# Create your views here.
class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": f"User {serializer.data['username']} has been created successfully!"},
                status=status.HTTP_201_CREATED
            )
        raise ValidationError(serializer.errors)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        request_username = request.data.get('username')
        request_password = request.data.get('password')

        if not request_username:
            return Response({"message": "No username provided"}, status=status.HTTP_400_BAD_REQUEST)
        if not request_password:
            return Response({"message": "No password provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=request_username, password=request_password)

        if user is not None:
            # Log the user in and create a session
            login(request, user)
            return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class SessionLogoutView(APIView):
    def post(self, request):
        if not isinstance(request.user, AnonymousUser):
            # Log out the user
            logout(request)
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        return Response({"message": "No user is logged in"}, status=status.HTTP_400_BAD_REQUEST)
