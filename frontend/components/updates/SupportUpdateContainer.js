import { connect } from 'react-redux';
import { withRouter } from "react-router";
import SupportUpdate from './SupportUpdate';
import { fetchCurrentPlan, fetchAvailablePlans, updateCurrentPlan } from '../../actions/support_actions';
import { fetchPlanPricing } from '../../utils/support_api_util';


const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  plansAndNames: state.support.availablePlans,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
  fetchAvailablePlans: () => dispatch(fetchAvailablePlans()),
  updateCurrentPlan: plan => dispatch(updateCurrentPlan(plan)),
  fetchPlanPricing: (plan, seats) => fetchPlanPricing(plan, seats)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportUpdate));