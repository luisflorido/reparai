import React from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";

const Home = ({ login, history }) => {
  const { error, data } = login;

  if (error || data === null) {
    history.push("/login");
  }

  return <Typography variant="h2">Aguarde...</Typography>;
};

const mapStateToProps = state => ({
  login: state.login
});

Home.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withRouter
)(Home);
