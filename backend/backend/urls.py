from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin

from backend import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.v1.urls', namespace='apiv1')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
