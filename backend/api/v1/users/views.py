from rest_framework import status, generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import logging

logger = logging.getLogger(__name__)


from api.v1.users.models import CustomUser
from api.v1.users.serializers import RegisterSerializer, UserSerializer


# Create your views here.
class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # Allow access to unauthenticated users

    def post(self, request):
        logger.info(f"Received data: {request.data}")
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": f"User {serializer.data['username']} has been created successfully!"},
                            status=status.HTTP_201_CREATED)
        raise ValidationError(serializer.errors)

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer