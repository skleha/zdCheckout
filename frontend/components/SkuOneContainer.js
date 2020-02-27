import { connect } from 'react-redux';
import SkuOne from './SkuOne';
import { fetchCurrentPlan } from '../actions/skuone_actions';


const mapStateToProps = state => ({
  currentPlan: Object.values(state.skuone),
  
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlan: () => dispatch(fetchCurrentPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkuOne);