from rest_framework import serializers

from users.models import Customer


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(min_length=3)
    password = serializers.CharField(min_length=3, write_only=True)

    class Meta:
        model = Customer
        fields = ('id', 'email', 'password')

    """
    Ensure password is hashed by calling set_password()
    """
    def create(self, validated_data):
        # Check if email already exists
        email = validated_data.get('email')
        if Customer.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email already registered')

        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
