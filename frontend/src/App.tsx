import "./App.css";
import {useState, FormEvent, ChangeEvent} from "react";
import {validateFormInput} from "./utils/validators";
import {IInputFields} from "./AppInterface.ts";
import Result from "./components/Result.tsx";
import LoanForm from "./components/LoanForm.tsx";

function App() {
    const [loanData, setLoanData] = useState<IInputFields>({
        loan_amount: "",
        loan_term: "",
        interest_rate: "",
    });
    const [monthlyPayment, setMonthlyPayment] = useState("")
    const [formError, setFormError] = useState<IInputFields>({
        loan_amount: "",
        loan_term: "",
        interest_rate: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMonthlyPayment("");
        const copy = {...loanData};
        copy[event.target.name as keyof IInputFields] = event.target.value;

        validateFormInput(event, setFormError);
        setLoanData(copy);
    }

    const handleCalculate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            formError.loan_amount ||
            formError.loan_term ||
            formError.interest_rate
        ) {
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/loan-offers/calculate/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loanData),
            });
            const responseJson = await response.json();

            if (response.ok) {
                setMonthlyPayment(responseJson["monthly_payment"]);
            } else {
                console.error(responseJson);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <div className="container center">
          <div className="">
              <h3 className="">Loan Details</h3>

              <div className="loan-details">
                  <section className="row">
                      <LoanForm handleCalculate={handleCalculate} handleChange={handleChange} formError={formError}/>
                      <Result monthlyPayment={monthlyPayment}/>
                  </section>
              </div>
          </div>
      </div>
    );
}

export default App;
