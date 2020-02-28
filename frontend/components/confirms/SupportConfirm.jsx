import React from "react";

class SupportConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPreviousPlan();
  }

  handleClick(e) {
    this.props.history.push('/update');
  }

  render() {
    if (!this.props.previousPlan) return "Loading...";
    const previous = this.props.previousPlan;
    const updated = this.props.currentPlan;

    const planChange = previous.name === updated.name ? "" : "changed";
    const seatChange = previous.seats === updated.seats ? "" : "changed";
    const costChange = previous.cost === updated.cost ? "" : "changed";

    return (
      <div className="confirm">
        <div className="confirm-title">Support Plan Updated</div>
        <div className="confirm-grid-container">
          <div className="confirm-grid-header"></div>
          <div className="confirm-grid-header">Previous Subscription</div>
          <div className="confirm-grid-header">Updated Subscription</div>
          <div className="confirm-grid-title">Plan Name</div>
          <div className="confirm-grid-data">{previous.name}</div>
          <div className={`confirm-grid-data ${planChange}`}>{updated.name}</div>
          <div className="confirm-grid-title">Seats</div>
          <div className="confirm-grid-data">{previous.seats}</div>
          <div className={`confirm-grid-data ${seatChange}`}>{updated.seats}</div>
          <div className="confirm-grid-title">Cost</div>
          <div className="confirm-grid-data">{previous.cost}</div>
          <div className={`confirm-grid-data ${costChange}`}>{updated.cost}</div>
        </div>
        <button onClick={this.handleClick} >Back to Updates</button>

      </div>
    );
  }
}

export default SupportConfirm;
