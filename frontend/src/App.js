import './App.css';
import {useState} from "react";

function App() {
    const [loanData, setLoanData] = useState({
        loan_amount: '',
        loan_term: '',
        interest_rate: '',
    });
    const [monthlyPayment, setMonthlyPayment] = useState('')

    const handleChange = (e) => {
        setMonthlyPayment('');
        const copy = {...loanData};
        copy[e.target.name] = e.target.value;
        setLoanData(copy);
    }

    const handleCalculate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/loan-offers/calculate/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loanData),
            });
            const responseJson = await response.json();
            console.log(responseJson);

            if (response.ok) {
                setMonthlyPayment(responseJson['monthly_payment']);
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
                              <input type="number" id="amount" name="loan_amount" placeholder="0" onChange={handleChange} />

                              <label htmlFor="term">Loan term in months</label>
                              <input type="number" id="term" name="loan_term" placeholder="0" onChange={handleChange} />

                              <div>Interest rate/annum</div>
                              <div className="row gap">
                                  <section className="column">
                                      <input type="number" step="0.1" id="rate" name="interest_rate" placeholder="0.0" onChange={handleChange} />
                                  </section>
                                  <section className="column">
                                      <input type="submit" id="calculate-button" value="Calculate"/>
                                  </section>
                              </div>
                          </section>
                      </form>

                      <section className="column">
                          <div className="result">
                              <h4>Result</h4>
                          </div>
                          <div className="result">
                              {monthlyPayment
                              ?
                                <p>Monthly payment: {monthlyPayment}</p>
                              :
                                <i>Result shows here</i>
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
