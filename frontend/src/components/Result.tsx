type Props = {
    monthlyPayment: string
}

const Result = (props: Props) => {
    return (
        <section className="column" style={{marginLeft: "20px"}}>
            <div className="result-section">
                <h4>Payment</h4>
            </div>
            <div className="result-section">
                {props.monthlyPayment
                    ?
                    <p style={{textAlign: "center"}}>You pay <br/>
                        <span className="result">{props.monthlyPayment}</span>
                        &nbsp;monthly!
                    </p>
                    :
                    <p style={{textAlign: "center"}}>Result shows here</p>
                }
            </div>
        </section>
    )
}

export default Result;
