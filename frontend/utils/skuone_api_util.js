
export const fetchCurrentPlan = () => {
  return $.ajax({
    url: '/api/current',
    method: 'GET'
  });
}

export const fetchAvailablePlans = () => {
  return $.ajax({
    url: "/api/skuone/plans",
    method: "GET"
  });
}

