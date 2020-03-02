import React from 'react';
import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import SupportPlan from '../frontend/models/SupportPlan';
import { cleanup, fireEvent, render, wait, getByPlaceholderText, getByTestId, waitForDomChange } from '@testing-library/react';
import SupportUpdate from '../frontend/components/updates/SupportUpdate';
import SupportConfirm from '../frontend/components/confirms/SupportConfirm';
import * as SubscriptionConstants from '../frontend/constants/constants';



describe('Test hasChangedSubscriptions helper function', () => {

  let plan, samePlan, differentPlan, differentSeats, differentSeatsAndPlan;

  beforeAll(() => {
    plan = new SupportPlan("best", "Best", 5, 5000);
    samePlan = new SupportPlan("best", "Best", 5, 5000);
    differentPlan = new SupportPlan("good", "Good", 5, 50);
    differentSeats = new SupportPlan("best", "Best", 10, 10000);
    differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);
  })
  
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



describe('React tests', () => {
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

    const { getByDisplayValue, getByTestId } = render(
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

      await wait(() => getByTestId("plan-select"));
      const plan = getByTestId("plan-select");
    
      fireEvent.change(getByDisplayValue(/good/i), {
        target: { value: SubscriptionConstants.plansAndNames.best }
      });

       await waitForDomChange({plan});
       expect(plan.value).toBe("best");
    
      // Race condition?
      const cost = getByTestId("cost");
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

    await wait(() => getByTestId("seats-select"));
    const seats = getByTestId("seats-select");
    const cost = getByTestId("cost");

    fireEvent.change(seats, {
      target: { value: 10 }
    });

    await waitForDomChange({ seats });
    expect(seats.value).toBe("10");
    expect(cost.innerHTML).toBe("100");
  });



  it('SupportUpdate component loads with current plan and update button disabled', async () => {
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

  // it("Upon two changes, one to a new plan, and another BACK to current plan, update button is disabled", async () => {
  //   const { getByText } = render(
  //     <SupportUpdate
  //       plansAndNames={SubscriptionConstants.plansAndNames}
  //       currentPlan={goodPlan}
  //       fetchAvailablePlans={() => {}}
  //       fetchCurrentPlan={() => {
  //         return { plan: "good", name: "Good", seats: 5, cost: 50 };
  //       }}
  //     />
  //   );

  //   await wait(() => getByText("Update Plan"));
  //   const button = getByText("Update Plan");

  //   expect(button.disabled).toBe(true);
  // });


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

        // get dom elements
        await wait(() => getByTestId("plan-select"));
        const plan = getByTestId("plan-select");
        const cost = getByTestId("cost");
        const updateButton = getByText("Update Plan");
        expect(plan.value).toBe("good");
        
        // change the plan from good to best
        fireEvent.change(getByDisplayValue(/good/i), {
          target: { value: SubscriptionConstants.plansAndNames.best }
        });

        // verify plan change / cost change
        await waitForDomChange({ plan });
        // expect(plan.value).toBe("Best");
        expect(cost.innerHTML).toBe("5000")

        // event:  click update plans button
        fireEvent(
          updateButton,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true
          })
        );

        // expect updateCurrentPlan to be called
        expect(updateCurrentPlan).toHaveBeenCalledTimes(1);
        
        // expect updateCurrentPlan payload to be SupportPlan instance
        
             
        
      
  })


  it('The confirmation screen should include a \'Back\' button', async () => {
    
    const { getByTestId } = render(
      <SupportConfirm
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={() => {
          return goodPlan;
        }}
      />
    )
 
    await wait(() => getByTestId('back-button'));
    const button = getByTestId('back-button');
 
    expect(button).toBeDefined();
  })

})