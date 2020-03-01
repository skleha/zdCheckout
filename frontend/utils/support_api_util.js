import * as core from "core-js/stable";
import * as regen from "regenerator-runtime";


export const fetchCurrentPlan = async () => {
  return await $.ajax({
    url: "/api/current",
    type: "GET"
  });
}

export const fetchPreviousPlan = async () => {
  return await $.ajax({
    url: "/api/previous",
    type: "GET"
  })
}

export const fetchAvailablePlans = async () => {
  return await $.ajax({
    url: "/api/support/plans",
    type: "GET"
  });
}

export const fetchPlanPricing = async (seats, plan) => {
  return await $.ajax({
    url: "/api/preview",
    type: "GET",
    data: { seats, plan }
  });
}

export const updateCurrentPlan = async settings => {
  return await $.ajax({
    url: "/api/current",
    type: "PUT",
    data: { settings }
  });
}