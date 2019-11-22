import React, { useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import makeStyles from "@material-ui/styles/makeStyles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import moment from "moment/min/moment-with-locales";

import useDebounce from "components/debounce";
import Loading from "components/Loading";
import { Creators as ServiceActions } from "store/ducks/service";

import { OPERATIONS } from "store/sagas/entitiesType";
const { ipcRenderer } = window.require("electron");

const Home = ({
  login,
  history,
  categoryLoading,
  locationLoading,
  service,
  serviceLoading,
  getService
}) => {
  const [filters, setFilters] = useState({
    name: "",
    date: null
  });
  const debounceFilter = useDebounce(filters, 500);
  const { error, data } = login;

  useEffect(() => {
    moment.locale("pt-br");
    ipcRenderer.send(OPERATIONS.CHANGE_SIZE_SCREEN, 80, 80);
    getService();
  }, []);

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
    },
    category: {
      backgroundColor: purple[500]
    },
    location: {
      backgroundColor: green[500]
    },
    field: {
      marginRight: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const getServices = () => {
    if (service) {
      const filtered = service
        .filter(e => e.device.name.indexOf(debounceFilter.name.trim()) !== -1)
        .filter(e => {
          if (debounceFilter.date) {
            return moment(e.updated_at).isSame(debounceFilter.date, "day");
          }
          return true;
        });
      return filtered.map(e => (
        <Grow key={e.id} in>
          <Grid item xs={6} lg={3} sm>
            <Paper className={classes.paper}>
              <Card>
                <CardContent>
                  <Grid item xs={12} sm container>
                    <Grid item xs container>
                      <Typography color="primary" variant="h6" gutterBottom>
                        {e.device.name}
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom>
                        {e.description}
                      </Typography>
                      <Box mt={2}>
                        {e.device.categories.map(c => (
                          <Chip
                            size="small"
                            key={c.name}
                            label={c.name}
                            className={classes.category}
                          />
                        ))}
                      </Box>
                      <Box mt={1}>
                        {e.device.locations.map(l => (
                          <Chip
                            size="small"
                            key={l.name}
                            label={l.name}
                            className={classes.location}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography color="textSecondary" gutterBottom>
                        {moment(e.created_at).format("l")}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grow>
      ));
    }
  };

  return (
    <div>
      <Grid container spacing={3} justify="flex-end">
        <Grid item>
          <Box display={{ xs: "block", sm: "inline" }}>
            <TextField
              className={classes.field}
              label="Nome"
              variant="filled"
              value={filters.name}
              onChange={event =>
                setFilters({ ...filters, name: event.target.value })
              }
            />
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={MomentUtils}
              locale="pt-br"
            >
              <DatePicker
                inputVariant="filled"
                emptyLabel="Data"
                clearable
                value={filters.date}
                onChange={date => setFilters({ ...filters, date })}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {getServices()}
      </Grid>
      <Loading
        loading={!!categoryLoading || !!locationLoading || !!serviceLoading}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  login: state.login,
  categoryLoading: state.category.loading,
  locationLoading: state.location.loading,
  serviceLoading: state.service.loading,
  service: state.service.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ServiceActions, dispatch);

Home.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categoryLoading: PropTypes.bool,
  locationLoading: PropTypes.bool,
  service: PropTypes.object.isRequired,
  serviceLoading: PropTypes.bool,
  getService: PropTypes.func.isRequired
};

Home.defaultProps = {
  categoryLoading: false,
  locationLoading: false,
  serviceLoading: false
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Home);
