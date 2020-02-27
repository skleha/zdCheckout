import React from "react";


class SkuOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentPlan: null }
  }

  componentDidMount() {
    this.props.fetchCurrentPlan();
  }

  render() {
    
    if (!this.props.currentPlan[0]) return (<div>Loading...</div>);
    const showMe = JSON.stringify(this.props.currentPlan);

    return (

      <div>
  
        {showMe}
              
      </div>

    )

  }

}

export default SkuOne;