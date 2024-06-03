from rest_framework import serializers

from loans.calculator import calculate_monthly_payment
from loans.models import LoanOffer


class LoanOfferSerializer(serializers.ModelSerializer):
    # Setting coerce_to_string to False overrides the default representation of decimals as strings
    interest_rate = serializers.DecimalField(max_digits=50, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = LoanOffer
        fields = ('id', 'customer', 'currency', 'interest_rate', 'loan_amount', 'loan_term')


class LoanOfferCalculatorSerializer(serializers.Serializer):
    loan_amount = serializers.IntegerField()
    loan_term = serializers.IntegerField()

    # Setting coerce_to_string to False overrides the default representation of decimals as strings
    interest_rate = serializers.DecimalField(max_digits=50, decimal_places=2, coerce_to_string=False)
    monthly_payment = serializers.DecimalField(max_digits=50, decimal_places=2, read_only=True, coerce_to_string=False)

    def create(self, validated_data):
        """
        Create and return an object with monthly_payment key, given the validated data.
        """
        validated_loan_amount = validated_data.get('loan_amount', 0)
        validated_interest_rate = validated_data.get('interest_rate', 0)
        validated_loan_term = validated_data.get('loan_term', 0)
        monthly_payment = calculate_monthly_payment(
            validated_loan_amount, validated_interest_rate, validated_loan_term
        )

        return {
            'loan_amount': validated_data['loan_amount'],
            'loan_term': validated_data['loan_term'],
            'interest_rate': validated_data['interest_rate'],
            'monthly_payment': monthly_payment,
        }
