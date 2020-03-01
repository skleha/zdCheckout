import React from "react";
import { fetchPlanPricing } from '../../utils/support_api_util';
import * as supportUpdateHelper from '../../helpers/supportUpdateHelper';
import SupportPlan from "../../model/SupportPlan";

class SupportUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "",
      isLoading: true,
      updateButtonEnabled: false
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
      isLoading: false,
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
      this.state.selectedPlan.seats
    );
  }


  handleSeatChange(e) {
    const seats = e.target.value;

    this.handleSubscriptionChange(
      this.state.selectedPlan.plan,
      this.state.selectedPlan.name,
      seats
    );
  }


  async handleSubscriptionChange(plan, planName, seats) {
    const { cost } = await fetchPlanPricing(plan, seats);
    const selectedPlan = new SupportPlan(plan, planName, seats, cost);
    const currentPlan = this.props.currentPlan;

    debugger;

    const {
      hasPlanChanged,
      hasSeatsChanged
    } = supportUpdateHelper.hasSubscriptionChanged(selectedPlan, currentPlan);

    

    this.setState({
      selectedPlan,
      updateButtonEnabled: hasPlanChanged || hasSeatsChanged
    });
  
  }


  async handleUpdatePlanClick(e) {
    await this.props.updateCurrentPlan(this.state);
    this.props.history.push("/confirm");
  }


  render() {
    if (this.state.isLoading) return "Loading...";
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
            value={this.state.selectedPlan.plan}
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
            value={this.state.selectedPlan.seats}
            onChange={this.handleSeatChange}
          />

          <div className="update-cost">{this.state.selectedPlan.cost}</div>
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
