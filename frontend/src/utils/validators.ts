import {IKeyboardEvent} from "./validatorsInterface.ts";
import {IInputFields} from "../AppInterface.ts";
import React from "react";

export const validateFormInput = (event: IKeyboardEvent, setFormError: React.Dispatch<React.SetStateAction<IInputFields>>) => {
    const target = event.target;
    const {name, value} = target;

    setFormError((prevState) => {
        const stateObj = {...prevState, [name]: ''};
        const negativeNumberErrorMessage = 'Please enter a positive number.'

        switch (name) {
            case 'loan_amount':
                if (!value) {
                    stateObj[name] = 'Please enter the amount.';
                } else if (Number(value) < 1) {
                    stateObj[name] = negativeNumberErrorMessage;
                }

                break;

            case 'loan_term':
                if (!value) {
                    stateObj[name] = 'Please enter the loan period (in months).';
                } else if (Number(value) < 1) {
                    stateObj[name] = negativeNumberErrorMessage;
                }

                break;

            case 'interest_rate':
                if (!value) {
                    stateObj[name] = 'Please enter the annual interest rate.';
                } else if (Number(value) < 1) {
                    stateObj[name] = negativeNumberErrorMessage;
                }

                break;

            default:
                break;
        }

        return stateObj;
    });
};
