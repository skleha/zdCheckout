import { connect } from 'react-redux';
import Confirm from './Confirm';
import { fetchPreviousPlan } from '../actions/support_actions';

const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  previousPlan: state.support.previousPlan,
});

const mapDispatchToProps = dispatch => ({
  fetchPreviousPlan: () => dispatch(fetchPreviousPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);