from __future__ import annotations

from api.v1.api.views import CustomRefreshToken
from api.v1.api.views import CustomTokenObtainPairView
from django.urls import include
from django.urls import path

app_name = 'api'

urlpatterns = [
    path('v1/', include('api.v1.api.urls'), name='v1'),
    path(
        'token/',
        CustomTokenObtainPairView.as_view(),
        name='token_obtain_pair',
    ),
    path('token/refresh/', CustomRefreshToken.as_view(), name='token_refresh'),
]
