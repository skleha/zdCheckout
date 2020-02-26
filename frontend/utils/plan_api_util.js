

export const fetchPlan = () => {
  return $.ajax({
    url: '/api/current',
    method: 'GET'
  });
}
