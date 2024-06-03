import "./App.css";
import {useState, FormEvent, ChangeEvent} from "react";
import {validateFormInput} from "./utils/validators";
import {IInputFields} from "./AppInterface.ts";

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
                      <form onSubmit={handleCalculate}>
                          <section className="column">
                              <label htmlFor="amount">Loan amount</label>
                              <input type="number" id="amount" name="loan_amount" placeholder="0" onChange={handleChange} required/>
                              {formError.loan_amount && <span className="error-message">{formError.loan_amount}</span>}

                              <label htmlFor="term">Loan term in months</label>
                              <input type="number" id="term" name="loan_term" placeholder="0" onChange={handleChange} required/>
                              {formError.loan_term && <span className="error-message">{formError.loan_term}</span>}

                              <div>Interest rate/annum</div>
                              <div className="row gap">
                                  <section className="column">
                                      <input role="rate" type="number" step="0.1" id="rate" name="interest_rate" placeholder="0.0"
                                             onChange={handleChange} required/>
                                      {formError.interest_rate && <span className="error-message">{formError.interest_rate}</span>}
                                  </section>
                                  <section className="column">
                                      <input type="submit" id="calculate-button" value="Calculate"/>
                                  </section>
                              </div>
                          </section>
                      </form>

                      <section className="column" style={{marginLeft: "20px"}}>
                          <div className="result-section">
                              <h4>Payment</h4>
                          </div>
                          <div className="result-section">
                              {monthlyPayment
                                  ?
                                  <p style={{textAlign: "center"}}>You pay <br />
                                      <span className="result">{monthlyPayment}</span>
                                      &nbsp;monthly!
                                  </p>
                                  :
                                  <p style={{textAlign: "center"}}>Result shows here</p>
                              }
                          </div>
                      </section>
                  </section>
              </div>
          </div>
      </div>
    );
}

export default App;
