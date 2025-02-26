from django.urls import path, include

from api.v1.apiv1.views import CustomTokenObtainPairView, CustomRefreshToken

app_name = 'api'

urlpatterns = [
    path('v1/', include("api.v1.apiv1.urls"), name='v1'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshToken.as_view(), name='token_refresh'),
]
