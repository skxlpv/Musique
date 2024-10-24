from django.urls import path, include


urlpatterns = [
    path('v1/', include('api.v1.users.urls', namespace='users')),
    path('v1/', include('api.v1.api_v1.urls', namespace='api_v1')),
]
