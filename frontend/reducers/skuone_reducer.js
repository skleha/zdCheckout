import { RECEIVE_CURRENT_PLAN, RECEIVE_AVAILABLE_PLANS } from '../actions/skuone_actions';

const skuOneReducer = (oldState = {currentPlan: [], availablePlans: []}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {

    case RECEIVE_CURRENT_PLAN:
      newState["currentPlan"] = action.currentPlan;
      return newState;

    case RECEIVE_AVAILABLE_PLANS:
      newState["availablePlans"] = action.availablePlans;
      return newState;

    default:
      return oldState;
  }
};

export default skuOneReducer;