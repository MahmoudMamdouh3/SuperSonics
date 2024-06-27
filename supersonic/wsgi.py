"""
WSGI config for SuperSonic project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from supersonic.settings import DATABASES  # Import Django settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "supersonic.settings")

application = get_wsgi_application()
