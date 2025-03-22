from __future__ import annotations

from api.v1.api.views import is_authenticated
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path

from backend import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.v1.urls', namespace='apiv1')),
    path('api/v1/check_auth/', is_authenticated, name='check_auth'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
