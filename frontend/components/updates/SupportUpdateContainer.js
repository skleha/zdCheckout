import { connect } from 'react-redux';
import { withRouter } from "react-router";
import SupportUpdate from './SupportUpdate';
import { fetchCurrentPlan, fetchPreviousPlan, fetchAvailablePlans, updateCurrentPlan } from '../../actions/support_actions';


const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  plansAndNames: state.support.availablePlans,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
  fetchAvailablePlans: () => dispatch(fetchAvailablePlans()),
  updateCurrentPlan: plan => dispatch(updateCurrentPlan(plan)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportUpdate));