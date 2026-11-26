from django.urls import path
from . import views

urlpatterns = [
    path('', views.loading, name='loading'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('home/', views.home, name='home'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('universities/', views.universities, name='universities'),
    path('galerie/', views.galerie, name='galerie'),
]