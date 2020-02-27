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
    
    const showMe = JSON.stringify(this.props.skuone);

    return (

      <div>
  
        {showMe}
              
      </div>

    )

  }

}

export default SkuOne;