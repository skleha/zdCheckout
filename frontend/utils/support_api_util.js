
export const fetchCurrentPlan = () => {
  return $.ajax({
    url: "/api/current",
    type: "GET"
  });
}

export const fetchPreviousPlan = () => {
  return $.ajax({
    url: "/api/previous",
    type: "GET"
  });
}

export const fetchAvailablePlans = () => {
  return $.ajax({
    url: "/api/support/plans",
    type: "GET"
  });
}

export const fetchPlanPricing = settings => {
  return $.ajax({
    url: "/api/preview",
    type: "GET",
    data: { settings }
  });
}

export const updateCurrentPlan = settings => {
  return $.ajax({
    url: "/api/current",
    type: "PUT",
    data: { settings }
  });
}