from django.test import TestCase
from rest_framework.reverse import reverse

from loans.models import LoanOffer
from users.models import Customer


class LoanOfferTest(TestCase):
    def test_create_loan_offer(self):
        # Create customer
        customer = Customer.objects.create_user(email="test@customer.com", password="foo")

        # Create loan-offer
        payload = {
            'customer': customer.id,
            'loan_amount': 5000,
            'interest_rate': 10,
            'loan_term': 5
        }
        url = reverse('loan-create')
        response = self.client.post(url, data=payload)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(LoanOffer.objects.count(), 1)
        self.assertEqual(LoanOffer.objects.get().customer, customer)
