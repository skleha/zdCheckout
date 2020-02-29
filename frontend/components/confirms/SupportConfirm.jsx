import React from "react";
import * as classNames from 'classnames'
import * as supportUpdateHelper from "../../helpers/supportUpdateHelper";

class SupportConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true}

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchPreviousPlan();
    this.setState({ isLoading: false});
  }

  handleClick(e) {
    this.props.history.push('/update');
  }

  render() {
    if (this.state.isLoading) return "Loading...";
    const previous = this.props.previousPlan;
    const updated = this.props.currentPlan;
    
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = supportUpdateHelper.hasSubscriptionChanged(
      {
        selectedPlan: updated.plan,
        selectedSeats: updated.seats,
        selectedCost: updated.cost
      },
      {
        currentPlan: previous.plan,
        currentSeats: previous.seats,
        currentCost: previous.cost
      }
    );

    const planChangeClassName = classNames("confirm-grid-data", {
      changed: hasPlanChanged
    });
    const seatChangeClassName = classNames("confirm-grid-data", {
      changed: hasSeatsChanged
    });
    const costChangeClassName = classNames("confirm-grid-data", {
      changed: hasCostChanged
    });

    return (
      <div className="confirm-component">
        <div className="confirm-title"></div>
        <div className="confirm-grid-container">
          <div className="confirm-grid-title">Support Plan</div>
          <div className="confirm-grid-header">Previous Subscription</div>
          <div className="confirm-grid-header">Updated Subscription</div>
          <div className="confirm-grid-title">Plan Name</div>
          <div className="confirm-grid-data">{previous.name}</div>
          <div className={planChangeClassName}>{updated.name}</div>
          <div className="confirm-grid-title">Seats</div>
          <div className="confirm-grid-data">{previous.seats}</div>
          <div className={seatChangeClassName}>{updated.seats}</div>
          <div className="confirm-grid-title">Cost</div>
          <div className="confirm-grid-data">{previous.cost}</div>
          <div className={costChangeClassName}>{updated.cost}</div>
        </div>
        <button className="confirm-back-button" onClick={this.handleClick}>
          Back to Updates
        </button>
      </div>
    );
  }
}

export default SupportConfirm;
