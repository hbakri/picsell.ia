import os
import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '#jk6b#*)*^onygn4+hm0y6_jxsn*1hv3q=w%v56o0dlsk%^=x('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
SSL = False
GCLOUD_STORAGE = False

# SECURITY WARNING: If you deploy a Django app to production, make sure to set
# an appropriate host here.
# See https://docs.djangoproject.com/en/1.10/ref/settings/
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    # django libraries
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # local libraries
    'images',

    # django-rest-framework
    'rest_framework'
]

REST_FRAMEWORK = {
    'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S.%fZ',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Security
# https://docs.djangoproject.com/fr/3.0/ref/settings/

if SSL:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True

ROOT_URLCONF = 'config.urls'

##############################################################
# ------------------------ TEMPLATES ----------------------- #
##############################################################

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
                'django.template.context_processors.media',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE'    : 'django.db.backends.postgresql',
        'NAME'      : os.environ['POSTGRES_DB'],
        'USER'      : os.environ['POSTGRES_USER'],
        'PASSWORD'  : os.environ['POSTGRES_PASSWORD'],
        'HOST'      : os.environ['POSTGRES_HOST'],
        'PORT'      : os.environ['POSTGRES_PORT'],
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

ADMINS = [('Hicham', 'hicham.bakri76@gmail.com'), ]
MANAGERS = ADMINS

##############################################################
# ------------------ STATIC & MEDIA FILES ------------------ #
##############################################################

if GCLOUD_STORAGE:
    GS_BUCKET_NAME = 'ipalace'
    GS_STATIC_BUCKET_NAME = GS_BUCKET_NAME + '-static'
    GS_MEDIA_BUCKET_NAME = GS_BUCKET_NAME + '-media'

    # To allow django-admin.py to automatically put your   
    # media files in your bucket set the following:
    DEFAULT_FILE_STORAGE = 'config.gcloud.GoogleCloudMediaFileStorage'

    # To allow django-admin.py collectstatic to automatically 
    # put your static files in your bucket set the following:
    STATICFILES_STORAGE = 'config.gcloud.GoogleCloudStaticFileStorage'

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.1/howto/static-files/
    STATIC_URL = 'https://storage.googleapis.com/{}/'.format(GS_STATIC_BUCKET_NAME)
    STATIC_ROOT = 'static/'

    # Media files (Uploaded by the user)
    # https://docs.djangoproject.com/en/2.1/topics/files/
    MEDIA_URL = 'https://storage.googleapis.com/{}/'.format(GS_MEDIA_BUCKET_NAME)
    MEDIA_ROOT = 'media/'

else:
    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.1/howto/static-files/

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    STATICFILES_DIR = [
        os.path.join(BASE_DIR, 'static')
    ]

    #  Add configuration for static files storage using whitenoise
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

    # Media files (Uploaded by the user)
    # https://docs.djangoproject.com/en/2.1/topics/files/
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

##############################################################
# -------------------------- CORS -------------------------- #
##############################################################

INSTALLED_APPS += ['corsheaders']
CORS_ORIGIN_ALLOW_ALL = True

##############################################################
# ---------------------- ERROR REPORT ---------------------- #
##############################################################

INSTALLED_APPS += ['error_report']
MIDDLEWARE += ['error_report.middleware.ExceptionProcessor']
ERROR_DETAIL_SETTINGS = {
    'ERROR_DETAIL_ENABLE': True,
}

##############################################################
# -------------------- IMPORT / EXPORT --------------------- #
##############################################################

INSTALLED_APPS += ['import_export']
IMPORT_EXPORT_USE_TRANSACTIONS = True
