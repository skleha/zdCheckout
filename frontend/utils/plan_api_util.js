
export const fetchCurrentPlan = () => {
  return $.ajax({
    url: '/api/current',
    method: 'GET'
  });
}
