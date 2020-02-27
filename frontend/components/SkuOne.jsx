import React from "react";


class SkuOne extends React.Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.fetchCurrentPlan();
    this.props.fetchAvailablePlans();
  }

  render() {
    

    return (

      <div>
  
        You have skuOne
              
      </div>

    )

  }

}

export default SkuOne;