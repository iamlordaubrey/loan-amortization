import {ChangeEvent, FormEvent} from "react";
import {IInputFields} from "../AppInterface.ts";

type Props = {
    handleCalculate: (event: FormEvent<HTMLFormElement>) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    formError: IInputFields;
}

const LoanForm = ({handleCalculate, handleChange, formError}: Props) => {
    return (
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
    )
}

export default LoanForm;