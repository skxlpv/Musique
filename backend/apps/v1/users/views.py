from rest_framework import generics
import logging

from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)


from apps.v1.users.models import CustomUser
from apps.v1.users.serializers import UserSerializer

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    pagination_class = PageNumberPagination

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user