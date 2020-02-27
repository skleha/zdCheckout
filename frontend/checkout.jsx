import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root";
import { fetchCurrentPlan, fetchAvailablePlans } from "./actions/skuone_actions";


document.addEventListener("DOMContentLoaded", () => {
  
  const store = configureStore();
  
  // Functions defined on the window
  window.fetchCurrentPlan = fetchCurrentPlan;
  window.fetchAvailablePlans = fetchAvailablePlans
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
