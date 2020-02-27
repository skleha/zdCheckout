
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
  url: "/api/skuone/current",
  type: "GET",
  responseText: currSubscription
});


$.mockjax({
  url: "/api/skuone/current",
  type: "PUT",
  responseDelay: 1000,
  response: function(settings) {  // settings is an object that includes keys ()
    
    let newData = {
      plan: settings.data.plan,
      name: PLAN_NAMES[settings.data.plan],
      seats: settings.data.seats,
      cost: settings.data.seats * PLAN_COSTS[settings.data.plan]
    };

    prevSubscription = currSubscription;
    currSubscription = newData;
    this.responseText = newData;
  }
});
