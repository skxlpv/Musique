from django.urls import path

from api.v1.users.views import RegisterUserView, UserListView

app_name = 'users'

urlpatterns = [
    path('registration/', RegisterUserView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user_list'),
]
