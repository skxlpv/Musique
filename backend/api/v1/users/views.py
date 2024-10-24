from rest_framework import generics
import logging

logger = logging.getLogger(__name__)


from api.v1.users.models import CustomUser
from api.v1.users.serializers import UserSerializer

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer