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


  handlePlanChange(e) {
    this.setState({ selectedName: e.target.value });
    
  }

  handleSeatChange(e) {
    this.setState({ selectedSeats: e.target.value });
  }

  render() {
    
    

    if (!this.props.currentPlan[0]) return ("Loading...");
    const plans = this.props.availablePlans;
    
    return (
      <div>
        <div>SkuOne Plan Options</div>

        <select id="plan-input" value={this.state.selectedPlan} onChange={this.handlePlanChange}>
          {plans.map((plan, idx) => (
            <option key={idx} value={plan}>{plan}</option>
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
