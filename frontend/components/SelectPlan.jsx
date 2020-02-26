import React from "react";


class SelectPlan extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentPlan: null }
  }


  render() {
    
    if (!this.state.currentPlan) return (<div>No plan in state</div>);

    return (

      <div>
  
        You've got select plan
              
      </div>

    )

  }

}

export default SelectPlan;