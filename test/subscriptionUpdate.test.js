import React from 'react';
import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import SupportPlan from '../frontend/models/SupportPlan';
import { cleanup, fireEvent, render, wait, getByPlaceholderText, getByTestId } from '@testing-library/react';
import SupportConfirm from '../frontend/components/confirms/SupportConfirm';
import SupportUpdate from '../frontend/components/updates/SupportUpdate';


const plan = new SupportPlan("best", "Best", 5, 5000);
const samePlan = new SupportPlan("best", "Best", 5, 5000);
const differentPlan = new SupportPlan("good", "Good", 5, 50);
const differentSeats = new SupportPlan("best", "Best", 10, 10000);
const differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);


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

const bestPlan = new SupportPlan("best", "Best", 5, 5000);
const goodPlan = new SupportPlan('good', 'Good', 5, 50);

const PlanNames = {
  basic: 'Basic',
  good: 'Good',
  better: 'Better',
  best: 'Best',
}


describe('React tests', () => {
  afterEach(cleanup)
 
  it('SupportUpdate component displays current subscription information upon load', async () => {
    
    const { getByPlaceholderText, getByTestId } = render(
      <SupportUpdate
        plansAndNames={PlanNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => { return PlanNames }}
        fetchCurrentPlan={() => { return goodPlan }}
      />
      )
      
      await wait(() => getByPlaceholderText("seats"))
      const seats = getByPlaceholderText("seats")      
      const cost = getByTestId("cost")
      const plan = getByTestId('plan-select')
      
      expect(plan.value).toBe("good");
      expect(seats.value).toBe("5")
      expect(cost.innerHTML).toBe("50");
  })


  it('SupportUpdate component updates cost on plan or seat change', async () => {

    const { getByText, getByTestId } = render(
      <SupportUpdate
        plansAndNames={PlanNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return PlanNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
      />
    );

      await wait(() => getByTestId("plan-select"));
      const planSelect = getByTestId("plan-select");
      console.log(planSelect.value);
      

      // fireEvent.click(getByText(PlanNames.best));


      // fireEvent(
      //   getByText("Best"),
      //   new MouseEvent("click", {
      //     bubbles: true,
      //     cancelable: true
      //   })
      // );
      
      fireEvent.change(planSelect, {target: {value: 'Best'}});


      const planSelectUpdated = getByTestId("plan-select");
      console.log(planSelectUpdated.value);

      const cost = getByTestId("cost");
      console.log(cost.innerHTML);
      

      await wait(() => getByText("5000"));
      const myCost = getByText("5000");
      
      expect(cost).toBeDefined();

  })





  it('SupportUpdate component loads with current plan and update button disabled', async () => {
    const { getByText } = render(
      <SupportUpdate
        plansAndNames={PlanNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {}}
        fetchCurrentPlan={() => {
          return { plan: 'good', name: 'Good', seats: 5, cost: 50 }
        }}
      />
    )

    await wait(() => getByText('Update Plan'))
    const button = getByText('Update Plan')

    expect(button.disabled).toBe(true)
  })

  it('SupportConfirm component loads with Back to Updates button', async () => {
    const { getByText } = render(
      <SupportConfirm
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={() => {
          return { plan: 'good', seats: 5, cost: 500 }
        }}
      />
    )
 
    await wait(() => getByText('Back to Updates'))
    const button = getByText('Back to Updates')
 
    expect(button).toBeDefined()
  })

})