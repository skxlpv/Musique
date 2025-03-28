from django.urls import path

from api.v1.files.views import get_user_files_by_username

app_name = 'files'

urlpatterns = [
    path('<str:username>/', get_user_files_by_username, name='files'),
]
