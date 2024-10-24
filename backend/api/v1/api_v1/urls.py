from django.urls import path

from api.v1.api_v1.views import RegisterUserView
from api.v1.api_v1.views import LoginUserView

app_name = 'api_v1'

urlpatterns = [
    path('registration/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='register'),
]
