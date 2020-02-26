

export const fetchPlan = () => {
  return $.mockjax({
    url: "/api/current",
    responseText: { status: "success"}
  });
}