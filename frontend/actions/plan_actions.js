import * as PlanAPIUtil from '../utils/plan_api_util';

export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";

const receiveCurrPlan = currentPlan => {
  return ({
    type: RECEIVE_CURRENT_PLAN,
    currentPlan
  })
}

export const fetchCurrentPlan = () => dispatch => (
  PlanAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrPlan(plan)))
);
