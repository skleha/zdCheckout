import * as SupportAPIUtil from '../utils/support_api_util';


export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";
export const RECEIVE_AVAILABLE_PLANS = "RECEIVE_AVAILABLE_PLANS";
export const RECEIVE_PREVIOUS_PLAN = "RECEIVE_PREVIOUS_PLAN";


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

const receivePrevPlan = previousPlan => {
  return ({
    type: RECEIVE_PREVIOUS_PLAN,
    previousPlan
  })
};


export const fetchCurrentPlan = () => dispatch => (
  SupportAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrPlan(plan)))
);

export const fetchPreviousPlan = () => dispatch => (
  SupportAPIUtil.fetchPreviousPlan()
    .then(plan => dispatch(receivePrevPlan(plan)))
)

export const fetchAvailablePlans = () => dispatch => (
  SupportAPIUtil.fetchAvailablePlans()
    .then(plans => dispatch(receiveAvailPlans(plans)))
);

export const updateCurrentPlan = plan => dispatch => (
  SupportAPIUtil.updateCurrentPlan(plan)
    .then(plan => dispatch(receiveCurrPlan(plan)))
);