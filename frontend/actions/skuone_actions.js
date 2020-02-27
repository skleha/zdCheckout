import * as SkuOneAPIUtil from '../utils/skuone_api_util';



export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";
export const RECEIVE_AVAILABLE_PLANS = "RECEIVE_AVAILABLE_PLANS";



const receiveCurrPlan = currentPlan => {
  return ({
    type: RECEIVE_CURRENT_PLAN,
    currentPlan
  })
};

const receiveAvailPlans = availablePlans => {
  return ({
    type: RECEIVE_AVAILABLE_PLANS,
    availablePlans
  })
};



export const fetchCurrentPlan = () => dispatch => (
  SkuOneAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrPlan(plan)))
);

export const fetchAvailablePlans = () => dispatch => (
  SkuOneAPIUtil.fetchAvailablePlans()
    .then(plans => dispatch(receiveAvailPlans(plans)))
);

