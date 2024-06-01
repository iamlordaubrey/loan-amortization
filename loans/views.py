from rest_framework import generics

from loans.serializers import LoanOfferSerializer, LoanOfferCalculatorSerializer


class LoanOfferCreate(generics.CreateAPIView):
    serializer_class = LoanOfferSerializer


class LoanOfferCalculate(generics.CreateAPIView):
    serializer_class = LoanOfferCalculatorSerializer
