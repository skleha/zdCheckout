import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import { fetchCurrentPlan } from "./utils/plan_api_util.js";


document.addEventListener("DOMContentLoaded", () => {
  
  window.fetchCurrentPlan = fetchCurrentPlan;
  
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
