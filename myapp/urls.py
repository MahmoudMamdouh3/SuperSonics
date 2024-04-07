from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'audios', AudioViewSet)
router.register(r'pre_pros', PreProViewSet)
router.register(r'enhanced_audios', EnhancedAudioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]