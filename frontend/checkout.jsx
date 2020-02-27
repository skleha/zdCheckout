import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root";
import { fetchCurrentPlan } from "./utils/plan_api_util.js";


document.addEventListener("DOMContentLoaded", () => {
  
  // Functions defined on the window
  window.fetchCurrentPlan = fetchCurrentPlan;
  
  
  const store = configureStore();
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
