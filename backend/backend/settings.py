import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = True
STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static_cdn')

MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

ALLOWED_HOSTS = ['*']

AUTH_USER_MODEL = 'users.CustomUser'

AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend',)


# Application definition
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    'api.v1.api',
    'api.v1.users',
    'api.v1.user_profile',
    'api.v1.dictionary',
    'api.v1.pages',
    'api.v1.files',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': '5432',
    },
}

# REST API
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.v1.api.authentication.CookiesJWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.BasePagination',
    'PAGE_SIZE': 100,
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=12),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': os.getenv('SECRET_KEY'),
    'VERIFYING_KEY': '',
    'AUDIENCE': None,
    'ISSUER': None,
    'JSON_ENCODER': None,
    'JWK_URL': None,
    'LEEWAY': 0,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_COOKIE': 'access_token',
    'AUTH_COOKIE_REFRESH': 'refresh_token',
    'AUTH_COOKIE_SECURE': True,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_SAMESITE': 'None',
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
    'TOKEN_OBTAIN_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenObtainPairSerializer',
    'TOKEN_REFRESH_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenRefreshSerializer',
    'TOKEN_VERIFY_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenVerifySerializer',
    'TOKEN_BLACKLIST_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenBlacklistSerializer',
    'SLIDING_TOKEN_OBTAIN_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer',
    'SLIDING_TOKEN_REFRESH_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer',
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Configuration
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

if DEBUG:
    CORS_ALLOWED_ORIGINS = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ]
else:
    CORS_ALLOWED_ORIGINS = [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
    ]

# CSRF Configuration
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SAMESITE = 'Lax' if DEBUG else 'None'
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

SESSION_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_SAMESITE = 'Lax' if DEBUG else 'None'
JAZZMIN_SETTINGS = {
    "menu": [
        {
            "name": "Profiles",
            "models": [
                "user_profile.UserProfile",
                "user_profile.MusicianProfile",
                "user_profile.ArtistProfile",
                "user_profile.TheatreArtistProfile",
                "user_profile.WriterProfile",
                "user_profile.CraftsmanProfile",
            ],
        },
        {
            "name": "Musician Specific",
            "models": [
                "user_profile.Instrument",
                "user_profile.Band",
                "user_profile.Genre",
            ],
        },
        {
            "name": "Artist Specific",
            "models": [
                "user_profile.Style",
                "user_profile.Medium",
                "user_profile.Exhibition",
            ],
        },
        {
            "name": "Craftsman Specific",
            "models": [
                "user_profile.Material",
                "user_profile.Workshop",
            ],
        },
        {
            "name": "Theatre Artist Specific",
            "models": [
                "user_profile.TheatreRole",
                "user_profile.TheatreCompany",
                "user_profile.TheatrePieceGenre",
                "user_profile.TheatreProject",
            ],
        },
        {
            "name": "Writer Specific",
            "models": [
                "user_profile.WriterGenre",
            ],
        },
    ],
    "navigation_expanded": False,
    "theme": "dark",
}