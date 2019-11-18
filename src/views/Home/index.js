import React, { useEffect } from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";

import Loading from "components/Loading";

import { OPERATIONS } from "store/sagas/entitiesType";
const { ipcRenderer } = window.require("electron");

const Home = ({ login, history, categoryLoading, locationLoading }) => {
  const { error, data } = login;

  useEffect(() => ipcRenderer.send(OPERATIONS.CHANGE_SIZE_SCREEN, 80, 80), []);
  useEffect(() => {
    if (data === null) {
      history.push("/login");
    }
  }, [error, data]);

  const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: 0,
      width: "100%",
      backgroundColor: theme.palette.background.default
    },
    paper: {
      width: "100%"
    }
  }));

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[...Array(4).keys()].map(e => (
            <Grid key={e} item xs={3}>
              <Paper className={classes.paper}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Dispositivo {e}
                    </Typography>
                    <Typography color="textSecondary">smartphone</Typography>
                    <Typography variant="body2" component="p">
                      localização: bloco A
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Loading loading={!!categoryLoading && !!locationLoading} />
    </Grid>
  );
};

const mapStateToProps = state => ({
  login: state.login,
  categoryLoading: state.category.loading,
  locationLoading: state.location.loading
});

Home.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categoryLoading: PropTypes.bool,
  locationLoading: PropTypes.bool
};

Home.defaultProps = {
  categoryLoading: false,
  locationLoading: false
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withRouter
)(Home);
