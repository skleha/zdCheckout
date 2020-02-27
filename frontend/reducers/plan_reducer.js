import { RECEIVE_CURRENT_PLAN } from '../actions/plan_actions';

const planReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, OldState);

  switch (action.type) {

    case RECEIVE_CURRENT_PLAN:
      return action.plan;

    default:
      return oldState;
  }
};

export default planReducer;