import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import * as SupportAPIUtils from '../frontend/utils/support_api_util';
import SupportPlan from '../frontend/models/SupportPlan';


const PlanNames = {
  basic: 'Basic',
  good: 'Good',
  better: 'Better',
  best: 'Best',
}

const plan = new SupportPlan("best", "Best", 5, 5000);
const samePlan = new SupportPlan("best", "Best", 5, 5000);
const differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);
const differentPlan = new SupportPlan("good", "Good", 5, 50);
const differentSeats = new SupportPlan("best", "Best", 10, 10000);



describe('Test hasChangedSubscriptions helper function', () => {

  test('hasSubscriptionChanged should yield all falses when same plan', () => {
    const {hasPlanChanged, hasSeatsChanged, hasCostChanged} = SubscriptionHelpers.hasSubscriptionChanged(
      plan,
      samePlan
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
      plan,
      differentSeatsAndPlan,
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
      plan,
      differentPlan
    );

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(
      plan,
      differentSeats
    );

    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });

})
