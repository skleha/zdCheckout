import * as SubscriptionHelpers from '../frontend/helpers/supportUpdateHelper';
import * as SupportAPIUtils from '../frontend/utils/support_api_util';



describe('Test hasChangedSubscriptions helper function', () => {
  let currentBestPlan, selectedBestPlan, selectedGoodPlan

  beforeAll(() => {
    currentBestPlan = {
      currentPlan: "best",
      currentName: "Best",
      currentSeats: 5,
      currentCost: 5000
    };

    selectedBestPlan = {
      selectedPlan: "best",
      selectedName: "Best",
      selectedSeats: 5,
      selectedCost: 5000
    };

    selectedGoodPlan = {
      selectedPlan: "good",
      selectedName: "Good",
      selectedSeats: 10,
      selectedCost: 100
    };
  })

  test('hasSubscriptionChanged should yield all falses when same plan', () => {
    const {hasPlanChanged, hasSeatsChanged, hasCostChanged} = SubscriptionHelpers.hasSubscriptionChanged(
      selectedBestPlan,
      currentBestPlan
    );
    
    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(false);
  })

  test("hasSubscriptionChanged should yield all trues when plan and seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(
      selectedGoodPlan,
      currentBestPlan,

    );

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });


  test("hasSubscriptionChanged should yield two trues when plan is changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(
      selectedGoodPlan,
      currentBestPlan
    );

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(
      selectedGoodPlan,
      currentBestPlan
    );

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });

})

describe('API tests', () => {

  test("fetchCurrentPlan should yield object with correct plan information", () => {
    const response = SupportAPIUtils.fetchCurrentPlan();
    expect(response.plan).toBe("good");
    expect(response.Name).toBe("Good");
    expect(response.seats).toBe(5);
    expect(response.plan).toBe(50);
  });


})





// two plans are the same, different
// Changing plan updates state
// Changing seats updates state

// API Calls verified
// fetchCurrentPlan returns the correct information
// fetchPreviousPlan returns correct info
// fetchPlanNames
// fetchPlanPricing
// updateCurrentPlan




// test to make sure correct price is retrived
