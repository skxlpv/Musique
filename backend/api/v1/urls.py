from django.urls import path, include


urlpatterns = [
    path('v1/', include('api.v1.users.urls', namespace='users')),
]
