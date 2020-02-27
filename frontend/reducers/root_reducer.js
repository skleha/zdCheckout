import { combineReducers } from 'redux';
import skuOneReducer from './skuone_reducer';

const rootReducer = combineReducers({
  skuone: skuOneReducer,

});

export default rootReducer;
