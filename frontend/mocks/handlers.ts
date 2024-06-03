import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`${import.meta.env.VITE_APP_API_URL}/loan-offers/calculate/`, () => {
    return HttpResponse.json({
        'loan_amount': 100,
        'loan_term': 6,
        'interest_rate': '10.00',
        'monthly_payment': '17.16'
    });
  }),
];
