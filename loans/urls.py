from django.urls import path

from loans import views

urlpatterns = [
    path('', views.LoanOfferCreate.as_view(), name='loan-create'),
    path('calculate/', views.LoanOfferCalculate.as_view(), name='loan-calculate'),
]
