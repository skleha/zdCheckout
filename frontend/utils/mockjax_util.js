
const PLAN_COSTS = {
  basic: 1,
  good: 10,
  better: 100,
  best: 1000
};

const PLAN_NAMES = {
  basic: "Basic",
  good: "Good",
  better: "Better",
  best: "Best"
};

let prevSubscription;

let currSubscription = {
  plan: "good",
  name: "Good",
  seats: 5,
  cost: 50
};

$.mockjax({
  url: "/api/current",
  type: "GET",
  responseText: currSubscription
});

$.mockjax({
  url: "api/previous",
  type: "GET",
  responseText: prevSubscription
});

$.mockjax({
  url: "/api/skuone/plans",
  type: "GET",
  responseText: PLAN_NAMES
});

$.mockjax({
  url: "/api/preview",
  type: "GET",
  response: function(request) {
    this.responseText = {
      selectedPlan: request.data.settings.selectedPlan,
      selectedName: request.data.settings.selectedName,
      selectedSeats: request.data.settings.selectedSeats,
      selectedCost: request.data.settings.selectedSeats * PLAN_COSTS[request.data.settings.selectedPlan]
    }
  }
});

$.mockjax({
  url: "/api/current/update",
  type: 'PATCH',
  response: function(request) {
    let newData = {
      plan: request.data.settings.selectedPlan,
      name: request.data.settings.selectedName,
      seats: request.data.settings.selectedSeats,
      cost: request.data.settings.selectedCost
    };

    prevSubscription = currSubscription;
    currSubscription = newData;
    this.responseText = newData;
  }
});
