import { connect } from "react-redux";
import SupportConfirm from "./SupportConfirm";
import { fetchPreviousPlan } from "../../actions/support_actions";

const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  previousPlan: state.support.previousPlan
});

const mapDispatchToProps = dispatch => ({
  fetchPreviousPlan: () => dispatch(fetchPreviousPlan())
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportConfirm);
