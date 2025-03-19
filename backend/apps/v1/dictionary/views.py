from types import NoneType

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.v1.dictionary.serializers import ChordSerializer


class ChordApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, root):
        model_serializer = ChordSerializer.get_serializer(root)
        if type(model_serializer) == NoneType:
            return
        queryset = model_serializer.get_model(root).objects.filter(root=f'{root}')
        serializer = model_serializer(queryset, many=True)

        return Response(serializer.data)
