import React from "react";
import { fetchPlanPricing } from '../../utils/support_api_util';

class SupportUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "no plan",
      selectedName: "no plan",
      selectedSeats: 0,
      selectedCost: 0,
      newPlan: false,
    };

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentPlan()
      .then(res => {
        this.setState({
          selectedPlan: this.props.currentPlan["plan"],
          selectedName: this.props.currentPlan["name"],
          selectedSeats: this.props.currentPlan["seats"],
          selectedCost: this.props.currentPlan["cost"]
        });
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

  haveNewPlan() {
    const currentPlan = this.props.currentPlan["plan"];
    const currentSeats = this.props.currentPlan["seats"];
    
    if (this.state.selectedPlan !== currentPlan || Number(this.state.selectedSeats) !== currentSeats) {
      this.setState({ newPlan: true});
    } else {
      this.setState({ newPlan: false });
    }
  }

  handlePlanChange(e) {
    const plan = e.target.value;
    const planName = this.getPlanName(this.props.plansAndNames, plan);

    this.setState({ selectedPlan: plan,
                    selectedName: planName,
                  }, () => {
                    this.updateCost();
                    this.haveNewPlan();
                  });
  }

  handleSeatChange(e) {
    const seats = e.target.value;
    this.setState({ selectedSeats: seats }, () => {
      this.updateCost();
      this.haveNewPlan();
    });
  }

  async handleClick(e) {
    await this.props.updateCurrentPlan(this.state);
    this.props.history.push('/confirm');
  }

  render() {
    
    if (!this.props.currentPlan) return ("Loading...");    
    const plans = Object.keys(this.props.plansAndNames);
  
    return (
      <div className="update-component">
        <div className="update-product">Support Plan:</div>

        <div className="update-grid">
          <div className="update-header">Plan</div>
          <div className="update-header">Seats</div>
          <div className="update-header">Cost</div>

          <select
            className="update-select"
            value={this.state.selectedPlan}
            onChange={this.handlePlanChange}
          >
            {plans.map((plan, idx) => (
              <option key={idx} value={plan}>
                {this.getPlanName(this.props.plansAndNames, plan)}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="update-input"
            value={this.state.selectedSeats}
            onChange={this.handleSeatChange}
          />

          <div className="update-cost">{this.state.selectedCost}</div>
        </div>

        <button
          className="update-button"
          disabled={!this.state.newPlan}
          onClick={this.handleClick}
        >
          Update Plan
        </button>
      </div>
    );

  }


}

export default SupportUpdate;
