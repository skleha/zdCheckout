import { combineReducers } from 'redux';
import planReducer from './plan_reducer';

const rootReducer = combineReducers({
  currentPlan: planReducer,

});

export default rootReducer;
