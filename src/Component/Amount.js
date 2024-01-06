import React, { Component } from "react";
import Display from "./Display";

class Amount extends Component {
  render() {
    const { amountData } = this.props
        var amount = 0;
        {
            amountData.map((data, index) => {
                if (data.type === "Get") {
                    amount = parseFloat(amount) + parseFloat(data.amount)
                }
                else if (data.type === "Spend") {
                    amount = parseFloat(amount) - parseFloat(data.amount)
                }
                else{
                    amount = parseFloat(amount)
                }
            })
        }

    return (
      <div>
        <Display data1={parseFloat(amount)} />
      </div>
    );
  }
}

export default Amount;
