from rest_framework import generics

from users.models import Customer
from users.serializers import CustomUserSerializer


class CustomerCreate(generics.CreateAPIView):
    serializer_class = CustomUserSerializer


class CustomerDetail(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    queryset = Customer.objects.all()
