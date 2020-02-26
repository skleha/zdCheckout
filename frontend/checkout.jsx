import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import { fetchPlan } from "./utils/plan_api_util.js";


document.addEventListener("DOMContentLoaded", () => {
  
  window.fetchPlan = fetchPlan;
  
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
