import React from "react";
import { fetchPlanPricing } from '../utils/skuone_api_util';

class SkuOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "better",
      selectedName: "Better",
      selectedSeats: 0,
      selectedCost: 0,
      newPlan: false,
    };

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentPlan()
      .then(res => {
        this.setState({ selectedPlan: this.props.currentPlan[0],
                        selectedName: this.props.currentPlan[1],
                        selectedSeats: this.props.currentPlan[2],
                        selectedCost: this.props.currentPlan[3],
                      })
      }
    );
    this.props.fetchAvailablePlans();
  }

  getPlanName(plansAndNames, plan) {
    return plansAndNames[plan];
  }

  updateCost() {
    
    fetchPlanPricing(this.state)
        .then(res => {
          this.setState(res);
        })
  }

  handlePlanChange(e) {
    const plan = e.target.value;
    const planName = this.getPlanName(this.props.plansAndNames, plan);

    this.setState({ selectedPlan: plan,
                    selectedName: planName,
                  }, this.updateCost);
    
  }

  handleSeatChange(e) {
    const seats = e.target.value;
    this.setState({ selectedSeats: seats }, this.updateCost);
  }

  render() {

    console.log(this.state);

    if (!this.props.currentPlan[0]) return ("Loading...");
    
    const plans = Object.keys(this.props.plansAndNames);
    
    return (
      <div>
        <div>Support Plan Options</div>

        <select id="plan-input" value={this.state.selectedPlan} onChange={this.handlePlanChange}>
          {plans.map((plan, idx) => (
            <option key={idx} value={plan}>{this.getPlanName(this.props.plansAndNames, plan)}</option>
          ))}
        </select>

        <input type="number" value={this.state.selectedSeats} onChange={this.handleSeatChange}/>

        <div>{this.state.selectedCost}</div>

        <button>Update Plan</button>

      </div>
    );

  }


}

export default SkuOne;
