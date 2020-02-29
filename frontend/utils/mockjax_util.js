
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

let prevSubscription = "hello";

let currSubscription = {
  plan: "good",
  name: "Good",
  seats: 5,
  cost: 50
};

$.mockjax({
  url: "/api/current",
  type: "GET",
  response: function() {
    this.responseText = currSubscription;
  }
});

$.mockjax({
  url: "/api/previous",
  type: "GET",
  response: function() {
    this.responseText = prevSubscription;
  }
});

$.mockjax({
  url: "/api/support/plans",
  type: "GET",
  responseText: PLAN_NAMES
});

$.mockjax({
  url: "/api/preview",
  type: "GET",
  response: function(request) {
    this.responseText = {
      cost: request.data.seats * PLAN_COSTS[request.data.plan]
    }
  }
});

$.mockjax({
  url: "/api/current",
  type: 'PUT',
  response: function(request) {
    
    let newData = {
      plan: request.data.settings.selectedPlan,
      name: request.data.settings.selectedName,
      seats: request.data.settings.selectedSeats,
      cost: request.data.settings.selectedCost
    };

    prevSubscription = {...currSubscription};
    currSubscription = newData;
    this.responseText = currSubscription;
  }
});
