from django.urls import path, include

from api.v1.apiv1 import views
from api.v1.apiv1.views import RegisterUserView, LoginUserView, LogoutUserView

app_name = 'apiv1'

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),

    path('users/', include("api.v1.users.urls"), name='users'),
]
