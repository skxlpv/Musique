from django.urls import path

from apps.v1.users.views import UserListView, CurrentUserView

app_name = 'users'

urlpatterns = [
    path('', UserListView.as_view(), name='user_list'),
    path('me', CurrentUserView.as_view(), name='current_user'),
]
