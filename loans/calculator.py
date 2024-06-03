import decimal


def calculate_monthly_payment(principal, annual_interest_rate, loan_term_months) -> decimal.Decimal:
    """
    Calculate the monthly payment for a loan using the standard loan amortization formula.

    :param principal: The loan amount (principal).
    :param annual_interest_rate: The annual interest rate (as a percentage).
    :param loan_term_months: The loan term in months.
    :return: The monthly payment amount.
    """
    # Convert annual interest rate to a decimal
    monthly_interest_rate = annual_interest_rate / 100 / 12
    # Total number of monthly payments
    total_payments = loan_term_months

    # Calculate the monthly payment using the amortization formula
    monthly_payment = (monthly_interest_rate * principal) / (1 - (1 + monthly_interest_rate) ** -total_payments)

    return monthly_payment
