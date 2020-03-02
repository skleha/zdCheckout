import React from 'react';
import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import SupportPlan from '../frontend/models/SupportPlan';
import { cleanup, fireEvent, render, wait, getByPlaceholderText, getByTestId, waitForDomChange } from '@testing-library/react';
import SupportUpdate from '../frontend/components/updates/SupportUpdate';
import SupportConfirm from '../frontend/components/confirms/SupportConfirm';
import * as SubscriptionConstants from '../frontend/constants/constants';



describe('Core specification tests', () => {
  afterEach(cleanup);

  let bestPlan, goodPlan;

  beforeAll(() => {
    bestPlan = new SupportPlan("best", "Best", 5, 5000);
    goodPlan = new SupportPlan("good", "Good", 5, 50);
  })
 

  it('SupportUpdate component displays current subscription information upon load', async () => {
    
    const { getByTestId } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => { return SubscriptionConstants.plansAndNames }}
        fetchCurrentPlan={() => { return goodPlan }}
      />
      )
      
      await wait(() => getByTestId("seats-select"))
      const plan = getByTestId('plan-select')
      const seats = getByTestId("seats-select")      
      const cost = getByTestId("cost")
      
      expect(plan.value).toBe("good");
      expect(seats.value).toBe("5")
      expect(cost.innerHTML).toBe("50");
  })



  it('SupportUpdate component updates cost on plan change', async () => {

    const { getByTestId } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={() => {
          return { cost: 5000 };
        }}
      />
    );

      // Get select and cost div
      await wait(() => getByTestId("plan-select"));
      const plan = getByTestId("plan-select");
      const cost = getByTestId("cost");

      // Change drop down to another plan
      fireEvent.change(plan, {
        target: { value: SubscriptionConstants.plansAndNames.best }
      });

      // Confirm cost has changed to fetched price 
      await waitForDomChange({cost});
      expect(cost.innerHTML).toBe("5000");
  })



  it("SupportUpdate component updates cost on seat change", async () => {
    const { getByTestId } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={() => {
          return { cost: 100 };
        }}
      />
    );

    // Get seats input and cost div
    await wait(() => getByTestId("seats-select"));
    const seats = getByTestId("seats-select");
    const cost = getByTestId("cost");

    // Change the number of seats
    fireEvent.change(seats, {
      target: { value: 10 }
    });

    // Confirm cost has changed to the fetched price
    await waitForDomChange({ seats });
    expect(seats.value).toBe("10");
    expect(cost.innerHTML).toBe("100");
  });



  it('App loads with update button disabled', async () => {
    const { getByText } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {}}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
      />
    )

    await wait(() => getByText('Update Plan'))
    const button = getByText('Update Plan')

    expect(button.disabled).toBe(true)
  })



  it("Upon two changes, one to a new plan, and another BACK to current plan, update button is disabled", async () => {
    
    const { getByDisplayValue, getByText } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {}}
        fetchCurrentPlan={() => { return goodPlan; }}
        fetchPlanPricing={() => { return { cost: 5000 }; }}
      />
    );

    // Get button and select
    await wait(() => getByText("Update Plan"));
    const button = getByText("Update Plan");
    const selectPlan = getByDisplayValue(/good/i);

    // Change the plan using the select
    fireEvent.change(selectPlan, {
      target: { value: SubscriptionConstants.plansAndNames.best }
    });
    
    // After plan change, button should be enabled
    await waitForDomChange({ button });
    expect(button.disabled).toBe(false);

    // Change plan back to original plan
    fireEvent.change(selectPlan, {
      target: { value: SubscriptionConstants.plansAndNames.good }
    });

    // After change to original plan, button should be disabled
    waitForDomChange({ button });
    expect(button.disabled).toBe(true);

  });


  it("With new subscription, click of Update button should send SupportPlan", async () => {

      const { getByDisplayValue, getByTestId, getByText } = render(
        <SupportUpdate
          currentPlan={goodPlan}
          plansAndNames={SubscriptionConstants.plansAndNames}          
          fetchCurrentPlan={() => { return goodPlan; }}
          fetchAvailablePlans={() => { return SubscriptionConstants.plansAndNames; }}
          fetchPlanPricing={() => { return { cost: 5000 }; }}
          updateCurrentPlan={(plan) => { return new SupportPlan(plan, "Best", 5, 5000) }}
      />
    )

        // Get select, cost div, and button
        await wait(() => getByTestId("plan-select"));
        const plan = getByTestId("plan-select");
        const cost = getByTestId("cost");
        const updateButton = getByText("Update Plan");
        
        // In original state, expect plan to be original plan
        expect(plan.value).toBe("good");
        
        // Change the plan from good to best
        fireEvent.change(getByDisplayValue(/good/i), {
          target: { value: SubscriptionConstants.plansAndNames.best }
        });

        // Verify plan change / cost change
        await waitForDomChange({ plan });
        expect(plan.value).toBe("Best");
        expect(cost.innerHTML).toBe("5000")

        // Event:  click update plans button
        fireEvent(
          updateButton,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true
          })
        );

        // Expect updateCurrentPlan to be called
        expect(updateCurrentPlan).toHaveBeenCalledTimes(1);
           
  })



  it('The confirmation screen should include a \'Back\' button', async () => {
    
    const { getByTestId } = render(
      <SupportConfirm 
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={() => {return goodPlan }}
      />
    )

    await wait(() => getByTestId("back-button"));
    const button = getByTestId("back-button");

    expect(button).toBeDefined();
  })


})




describe("Test hasChangedSubscriptions helper function", () => {
  let plan, samePlan, differentPlan, differentSeats, differentSeatsAndPlan;

  beforeAll(() => {
    plan = new SupportPlan("best", "Best", 5, 5000);
    samePlan = new SupportPlan("best", "Best", 5, 5000);
    differentPlan = new SupportPlan("good", "Good", 5, 50);
    differentSeats = new SupportPlan("best", "Best", 10, 10000);
    differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);
  });

  test("hasSubscriptionChanged should yield all falses when same plan", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, samePlan);

    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(false);
  });

  test("hasSubscriptionChanged should yield all trues when plan and seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentSeatsAndPlan);

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when plan is changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentPlan);

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentSeats);

    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });
});
