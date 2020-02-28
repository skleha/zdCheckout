import React from 'react';

class Confirm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPreviousPlan();
  }


  render() {
    const previous = this.props.previousPlan;
    const updated = this.props.currentPlan;
    if (!previous) return ("Loading...")


    return (
      <div>
        <div className="confirm-grid-container">
          <div>Plan Name</div>
          <div>{previous.name}</div>
          <div>{updated.name}</div>
          <div>Seats</div>
          <div>{updated.seats}</div>
          <div>{previous.seats}</div>
          <div>Cost</div>
          <div>{updated.cost}</div>
          <div>{previous.cost}</div>
        </div>
      </div>
    );
  }

}


export default Confirm;