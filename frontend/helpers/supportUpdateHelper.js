
export const hasSubscriptionChanged = (selected, current) => {
  const { currentPlan, currentSeats, currentCost } = current;
  const { selectedPlan, selectedSeats, selectedCost } = selected;

  const hasPlanChanged = selectedPlan !== currentPlan;
  const hasSeatsChanged = Number(selectedSeats) !== Number(currentSeats);
  const hasCostChanged = currentCost !== selectedCost;

  return { hasPlanChanged, hasSeatsChanged, hasCostChanged }
};




