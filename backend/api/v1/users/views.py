from __future__ import annotations

from api.v1.users.models import CustomUser
from api.v1.users.serializers import UserSerializer
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    pagination_class = PageNumberPagination