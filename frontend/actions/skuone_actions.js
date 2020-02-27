import * as SkuOneAPIUtil from '../utils/skuone_api_util';

export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";

const receiveCurrPlan = currentPlan => {
  return ({
    type: RECEIVE_CURRENT_PLAN,
    currentPlan
  })
};

export const fetchCurrentPlan = () => dispatch => (
  SkuOneAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrPlan(plan)))
);
