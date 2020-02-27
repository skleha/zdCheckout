import { connect } from 'react-redux';
import SkuOne from './SkuOne';
import { fetchCurrentPlan } from '../actions/plan_actions';


const mapStateToProps = state => ({
  currentPlan: Object.values(state.currentPlan),
  
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkuOne);