import { RECEIVE_CURRENT_PLAN } from '../actions/skuone_actions';

const skuOneReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {

    case RECEIVE_CURRENT_PLAN:
      return action.currentPlan;

    default:
      return oldState;
  }
};

export default skuOneReducer;