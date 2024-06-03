from rest_framework import generics, status
from rest_framework.response import Response

from loans.serializers import LoanOfferSerializer, LoanOfferCalculatorSerializer


class LoanOfferCreate(generics.CreateAPIView):
    serializer_class = LoanOfferSerializer


class LoanOfferCalculate(generics.CreateAPIView):
    serializer_class = LoanOfferCalculatorSerializer

    """
    Since the calculated monthly payment is not being saved, overriding the Create method to
    return status code 200 OK, rather than 201 CREATED.
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
