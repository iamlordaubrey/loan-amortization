from rest_framework import serializers

from loans.models import LoanOffer


class LoanOfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = LoanOffer
        fields = ('id', 'customer', 'currency', 'interest_rate', 'loan_amount', 'loan_term')
