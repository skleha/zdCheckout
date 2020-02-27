
export const fetchCurrentPlan = () => {
  return $.ajax({
    url: '/api/skuone/current',
    method: 'GET'
  });
}

export const fetchAvailablePlans = () => {
  return $.ajax({
    url: "/api/skuone",
    method: "GET"
  });
}
