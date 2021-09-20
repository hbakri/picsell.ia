from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.ImageView.as_view(), name= 'images_list'),
]