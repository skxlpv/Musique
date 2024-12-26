from django.urls import path

from api.v1.apiv1.views import FileUploadView

app_name = 'pages'

urlpatterns = [
    path('create_file/', FileUploadView.as_view(), name='create_file'),

    # path('writers/', AddWritersFile.as_view(), name='pages'),
]
