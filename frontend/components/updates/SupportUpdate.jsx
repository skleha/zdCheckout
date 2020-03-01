import React from "react";
import { fetchPlanPricing } from '../../utils/support_api_util';
import * as supportUpdateHelper from '../../helpers/supportUpdateHelper';
import { DefaultSubscription } from '../../constants/SubscriptionConstants'
import SupportPlan from "../../model/SupportPlan";

class SupportUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "",
      isLoading: true,
    }

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleUpdatePlanClick = this.handleUpdatePlanClick.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchCurrentPlan()
    const { plan, name, seats, cost } = this.props.currentPlan;
    
    this.setState({
      selectedPlan: new SupportPlan(plan, name, seats, cost),
      isLoading: false
      });

    this.props.fetchAvailablePlans();
  }

  getPlanName(plansAndNames, plan) {
    return plansAndNames[plan];
  }

  handlePlanChange(e) {
    const selectedPlan = e.target.value;
    const selectedName = this.getPlanName(
      this.props.plansAndNames,
      selectedPlan
    );
    
    this.handleSubscriptionChange(
      selectedPlan,
      selectedName,
      this.state.selectedSeats
    );
  }

  handleSeatChange(e) {
    const seats = e.target.value;
    this.handleSubscriptionChange(
      this.state.selectedPlan,
      this.state.selectedName,
      seats
    );
  }

  async handleSubscriptionChange(plan, planName, seats) {
    const current = {
      currentPlan: this.props.currentPlan.plan,
      currentSeats: this.props.currentPlan.seats,
      currentCost: this.props.currentPlan.cost
    };

    const { cost } = await fetchPlanPricing(seats, plan);

    const selected = { 
      selectedSeats: seats,
      selectedPlan: plan,
      selectedCost: cost 
    };

    const {
      hasPlanChanged,
      hasSeatsChanged
    } = supportUpdateHelper.hasSubscriptionChanged(selected, current);

    this.setState({
      selectedPlan: plan,
      selectedName: planName,
      selectedSeats: seats,
      selectedCost: cost,
      updateButtonEnabled: hasPlanChanged || hasSeatsChanged
    });
  }

  async handleUpdatePlanClick(e) {
    await this.props.updateCurrentPlan(this.state);
    this.props.history.push("/confirm");
  }

  render() {
    if (!this.props.currentPlan) return "Loading...";
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
          disabled={!this.state.updateButtonEnabled}
          onClick={this.handleUpdatePlanClick}
        >
          Update Plan
        </button>
      </div>
    );
  }
}

export default SupportUpdate;
