import { RECEIVE_CURRENT_PLAN } from '../actions/plan_actions';

const planReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {

    case RECEIVE_CURRENT_PLAN:
      return action.currentPlan;

    default:
      return oldState;
  }
};

export default planReducer;