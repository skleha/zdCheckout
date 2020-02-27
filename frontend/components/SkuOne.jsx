import React from "react";


class SkuOne extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentPlan();
    this.props.fetchAvailablePlans();
  }

  render() {
    
    const plans = this.props.availablePlans;
    const currentPlan = this.props.currentPlan[1];
    
    return (
      <div>
        SkuOne Plan Options<br></br>

        <select id="plan-input" value={currentPlan}>
          {plans.map((plan, idx) => (
            <option
              key={idx}
              value={plan}
              >
                {plan}
            </option>
          ))}
        </select>
      
      </div>
    );

  }

}

export default SkuOne;


// put selected on 