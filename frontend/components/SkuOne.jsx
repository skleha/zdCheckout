import React from "react";


class SkuOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlan: "Good",
      currentSeats: 0,
    };

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentPlan();
    this.props.fetchAvailablePlans();
  }


  handlePlanChange(e) {
    this.setState({ currentPlan: e.target.value });
  }

  handleSeatChange(e) {
    this.setState({ currentSeats: e.target.value });
  }

  render() {
    
    if (!this.props.currentPlan[0]) return ("Loading...");
    const plans = this.props.availablePlans;

    return (
      <div>
        <div>SkuOne Plan Options</div>

        <select id="plan-input" value={this.state.currentPlan} onChange={this.handlePlanChange}>
          {plans.map((plan, idx) => (
            <option key={idx} value={plan}>{plan}</option>
          ))}
        </select>

        <input type="number" value={this.state.currentSeats} onChange={this.handleSeatChange}/>
      </div>
    );

  }


}

export default SkuOne;


// put selected on 