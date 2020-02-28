import React from 'react';

class Confirm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPreviousPlan();
  }


  render() {
    const curr = JSON.stringify(this.props.currentPlan);
    const prev = JSON.stringify(this.props.previousPlan);

    return (
      <div>{prev}</div>
    )
  }

}


export default Confirm;