from __future__ import annotations

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from api.v1.api.serializers import RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            # Additional token validation
            RefreshToken(refresh_token)

            res = Response({'success': True})

            cookie_settings = {
                'httponly': True,
                'secure': True,
                'samesite': 'None',
                'path': '/'
            }

            res.set_cookie('access_token', access_token, **cookie_settings)
            res.set_cookie('refresh_token', refresh_token, **cookie_settings)

            return res
        except (InvalidToken, TokenError) as e:
            return Response({
                'success': False,
                'error': 'Invalid authentication credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({
                'success': False,
                'error': 'Authentication failed'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomRefreshToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response({
                    'refreshed': False,
                    'error': 'No refresh token found'
                }, status=status.HTTP_401_UNAUTHORIZED)

            # Validate refresh token
            RefreshToken(refresh_token)

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response({'refreshed': True})

            # Secure cookie settings
            cookie_settings = {
                'httponly': True,
                'secure': True,
                'samesite': 'None',
                'path': '/'
            }

            res.set_cookie('access_token', access_token, **cookie_settings)

            return res
        except (InvalidToken, TokenError):
            return Response({
                'refreshed': False,
                'error': 'Invalid refresh token'
            }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({
                'refreshed': False,
                'error': 'Token refresh failed'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'success': True,
            'user_id': user.id
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        res = Response({'success': True})
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except Exception as e:
        return Response({'success': False,'error': 'Logout failed'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})