from rest_framework import serializers

from users.models import Customer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'email')
