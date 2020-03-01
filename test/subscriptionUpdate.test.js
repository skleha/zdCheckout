import React from 'react';
import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import SupportPlan from '../frontend/models/SupportPlan';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import SupportConfirm from '../frontend/components/confirms/SupportConfirm';
import SupportUpdate from '../frontend/components/updates/SupportUpdate';

const PlanNames = {
  basic: 'Basic',
  good: 'Good',
  better: 'Better',
  best: 'Best',
}

const plan = new SupportPlan("best", "Best", 5, 5000);
const samePlan = new SupportPlan("best", "Best", 5, 5000);
const differentPlan = new SupportPlan("good", "Good", 5, 50);
const differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);
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

const currPlan = new SupportPlan("best", "Best", 5, 5000);
const prevPlan = new SupportPlan('good', 'Good', 5, 500);


describe('React tests', () => {
  afterEach(cleanup)
 
  it('Loads SupportConfirm component', async () => {
    const { getByText } = render(
      <SupportConfirm
        currentPlan={currPlan}
        previousPlan={prevPlan}
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