from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['your-render-app-name.onrender.com']

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.vercel.app",
    "https://your-frontend-domain.netlify.app"
]

# Database - If you want to use PostgreSQL on Render
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'your_db_host',
        'PORT': '5432',
    }
}

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True 