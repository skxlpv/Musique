from __future__ import annotations

from api.v1.users.views import UserListView
from api.v1.users.views import UserProfileView
from django.urls import path

app_name = 'users'

urlpatterns = [
    path('', UserListView.as_view(), name='user_list'),
    path('me', UserProfileView.as_view(), name='current_user'),
]
