import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root";
import {  fetchAvailablePlans } from "./actions/skuone_actions";
import { fetchCurrentPlan, fetchPlanPricing, updateCurrentPlan } from "./utils/skuone_api_util";

document.addEventListener("DOMContentLoaded", () => {
  
  const store = configureStore();
  
  // Functions defined on the window
  window.fetchCurrentPlan = fetchCurrentPlan;
  window.fetchAvailablePlans = fetchAvailablePlans;
  window.fetchPlanPricing = fetchPlanPricing;
  window.updateCurrentPlan = updateCurrentPlan;
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
