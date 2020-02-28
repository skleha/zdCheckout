import { connect } from 'react-redux';
import SupportUpdate from './SupportUpdate';
import { fetchCurrentPlan, fetchAvailablePlans, updateCurrentPlan } from '../../actions/support_actions';


const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  plansAndNames: state.support.availablePlans,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
  fetchAvailablePlans: () => dispatch(fetchAvailablePlans()),
  updateCurrentPlan: plan => dispatch(updateCurrentPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportUpdate);