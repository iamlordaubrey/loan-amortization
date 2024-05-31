from django.urls import path

from users import views

urlpatterns = [
    path('', views.CustomerCreate.as_view(), name='customer-create'),
    path('<str:pk>/', views.CustomerDetail.as_view(), name='customer-detail'),
]
