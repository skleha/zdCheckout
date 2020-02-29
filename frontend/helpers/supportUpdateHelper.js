
export const hasPlanChanged = (selected, current) => {
    const { currentPlan, currentSeats } = current;
    const { selectedPlan, selectedSeats } = selected;
    const hasChanged = (selectedPlan !== currentPlan || Number(selectedSeats) !== currentSeats);
    return hasChanged;
  }




