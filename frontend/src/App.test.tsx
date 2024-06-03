import { expect, test } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react';

import App from "./App.tsx";

describe('Loan details form', () => {
  test('renders form for loan details', () => {
    render(<App/>);
    const title = screen.getByText(/Loan Details/i);
    const result = screen.getByText(/Result shows here/i);
    expect(title).toBeInTheDocument();
    expect(result).toBeInTheDocument();
  });
})

describe('Input fields validation', () => {
  test('Improperly filled fields renders validation errors', async () => {
    render(<App/>);
    const loanAmount = screen.getByLabelText('Loan amount');

    act(() => {
      fireEvent.change(loanAmount, { target: { value: -100 } });
    })
    const amountErrorMessage = await screen.findByText(/Please enter a positive number./i);
    expect(amountErrorMessage).toBeInTheDocument();

    act(() => {
      fireEvent.change(loanAmount, { target: { value: null } });
    })
    const amountErrorMessage2 = await screen.findByText(/Please enter the amount./i);
    expect (amountErrorMessage2).toBeInTheDocument();
  });

  test('Properly filled fields shows NO validation errors', async () => {
    render(<App/>);
    const loanAmount = screen.getByLabelText('Loan amount');
    const loanTerm = screen.getByLabelText('Loan term in months');
    const loanInterest = screen.getByRole('rate');

    act(() => {
      fireEvent.change(loanAmount, { target: { value: 100 } });
      fireEvent.change(loanTerm, { target: { value: 6 } });
      fireEvent.change(loanInterest, { target: { value: 10 } });
    })
    const amountErrorMessage = screen.queryByText(/Please enter a positive number./i);
    const TermErrorMessage = screen.queryByText(/Please enter the loan period (in months)./i);
    const interestErrorMessage = screen.queryByText(/Please enter the annual interest rate./i);

    expect(amountErrorMessage).not.toBeInTheDocument();
    expect(TermErrorMessage).not.toBeInTheDocument();
    expect(interestErrorMessage).not.toBeInTheDocument();
  })
});

describe('Request to API endpoint', () => {
  test('Properly filled fields renders the result text', async () => {
    render(<App/>);

    const loanAmount = screen.getByLabelText('Loan amount');
    const loanTerm = screen.getByLabelText('Loan term in months');
    const loanInterest = screen.getByRole('rate');

    act(() => {
      fireEvent.change(loanAmount, { target: { value: 100 } });
      fireEvent.change(loanTerm, { target: { value: 6 } });
      fireEvent.change(loanInterest, { target: { value: 10 } });

      fireEvent.click(screen.getByText(/Calculate/i));
    })

    const resultMessage = await screen.findByText(/You pay/i);
    expect (resultMessage).toBeInTheDocument();
  })
})
