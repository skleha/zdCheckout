import { connect } from 'react-redux';
import SkuOne from './SkuOne';
import { fetchCurrentPlan, fetchAvailablePlans, updateCurrentPlan } from '../actions/skuone_actions';


const mapStateToProps = state => ({
  currentPlan: state.skuone.currentPlan,
  plansAndNames: state.skuone.availablePlans,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
  fetchAvailablePlans: () => dispatch(fetchAvailablePlans()),
  updateCurrentPlan: plan => dispatch(updateCurrentPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkuOne);