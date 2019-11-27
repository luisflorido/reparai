import React, { useEffect } from "react";

import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { Creators as LoginActions } from "store/ducks/login";

import { OPERATIONS } from "store/sagas/entitiesType";
const { ipcRenderer } = window.require("electron");

const Home = ({ login, history, loadAll }) => {
  const { error, data } = login;

  useEffect(() => {
    ipcRenderer.send(OPERATIONS.CHANGE_SIZE_SCREEN, 80, 80);
  }, []);

  useEffect(() => {
    if (data === null) {
      history.push("/login");
    } else {
      loadAll();
      history.push("/services");
    }
  }, [error, data]);

  return <div>teste</div>;
};

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginActions, dispatch);

Home.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadAll: PropTypes.func.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Home);
