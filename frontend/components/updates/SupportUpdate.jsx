import React from "react";
import { fetchPlanPricing } from '../../utils/support_api_util';
import * as supportUpdateHelper from '../../helpers/supportUpdateHelper';

class SupportUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "no plan",
      selectedName: "no plan",
      selectedSeats: 0,
      selectedCost: 0,
      updateButtonEnabled: false
    };

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleUpdatePlanClick = this.handleUpdatePlanClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentPlan().then(res => {
      this.setState({
        selectedPlan: this.props.currentPlan["plan"],
        selectedName: this.props.currentPlan["name"],
        selectedSeats: this.props.currentPlan["seats"],
        selectedCost: this.props.currentPlan["cost"]
      });
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
    const selected = { selectedSeats: seats, selectedPlan: plan };
    const current = {
      currentPlan: this.props.currentPlan.plan,
      currentSeats: this.props.currentPlan.seats
    };

    const hasPlanChanged = supportUpdateHelper.hasPlanChanged(
      selected,
      current
    );

    const { cost } = await fetchPlanPricing(
      selected.selectedSeats,
      selected.selectedPlan
    );

    this.setState({
      selectedPlan: plan,
      selectedName: planName,
      selectedSeats: seats,
      selectedCost: cost,
      updateButtonEnabled: hasPlanChanged
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
