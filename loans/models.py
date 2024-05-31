from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import Customer


class LoanOffer(models.Model):
    class Currency(models.TextChoices):
        EURO = 'EUR', _('Euro')
        DOLLAR = 'USD', _('United States dollar')
        POUNDS = 'GBP', _('Pound sterling')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    currency = models.CharField(max_length=3, choices=Currency, default=Currency.EURO)
    interest_rate = models.DecimalField(max_digits=50, decimal_places=2, default=1)

    # smallest currency denomination
    loan_amount = models.IntegerField()

    # measured in months
    loan_term = models.IntegerField()
