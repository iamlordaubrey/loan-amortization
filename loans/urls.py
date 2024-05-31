from django.urls import path

from loans import views

urlpatterns = [
    path('', views.LoanOfferCreate.as_view(), name='loan-create'),
]
