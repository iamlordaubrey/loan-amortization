from rest_framework import generics

from loans.serializers import LoanOfferSerializer


class LoanOfferCreate(generics.CreateAPIView):
    serializer_class = LoanOfferSerializer
