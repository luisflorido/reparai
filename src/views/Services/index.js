import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import ChatIcon from '@material-ui/icons/Chat';
import ArchiveIcon from '@material-ui/icons/Archive';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import makeStyles from '@material-ui/styles/makeStyles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment/min/moment-with-locales';

import useDebounce from 'components/debounce';
import withConfirmDialog from 'components/ConfirmDialog';
import Loading from 'components/Loading';
import { Creators as ServiceActions } from 'store/ducks/service';
import { Creators as LoginActions } from 'store/ducks/login';

import { OPERATIONS } from 'store/sagas/entitiesType';
const { ipcRenderer } = window.require('electron');

const Services = ({
  login,
  history,
  categoryLoading,
  locationLoading,
  service,
  serviceLoading,
  getService,
  openConfirmDialog,
  deleteService,
  loadAll,
}) => {
  const [filters, setFilters] = useState({
    name: '',
    date: null,
    archived: false,
  });
  const debounceFilter = useDebounce(filters, 500);
  const { error, data } = login;

  useEffect(() => {
    moment.locale('pt-br');
    ipcRenderer.send(OPERATIONS.CHANGE_SIZE_SCREEN, 80, 80);
    getService();
    loadAll();
  }, []);

  useEffect(() => {
    if (data === null) {
      history.push('/login');
    }
  }, [error, data]);

  const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: 0,
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    paper: {
      width: '100%',
    },
    field: {
      marginRight: theme.spacing(1),
    },
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '11rem',
    },
  }));

  const classes = useStyles();

  const getLoggedUser = () => {
    const { data } = login;
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed) {
        return parsed;
      }
    }
    return null;
  };

  const isAdm = () => {
    const user = getLoggedUser();
    if (user && user.roles && user.roles.find(e => e === 'adm')) {
      return true;
    }
    return false;
  };

  const isServiceByUser = service => {
    const { user } = getLoggedUser();
    if (user && user.id === service.user.id) {
      return true;
    }
    return false;
  };

  const getServices = () => {
    if (service) {
      const filtered = service
        .filter(e => {
          if (filters.archived) {
            return e.deleted_at;
          }
          return !e.deleted_at;
        })
        .filter(e => e.device.name.indexOf(debounceFilter.name.trim()) !== -1)
        .filter(e => {
          if (debounceFilter.date) {
            return moment(e.updated_at).isSame(debounceFilter.date, 'day');
          }
          return true;
        });
      return filtered.map(e => (
        <Grow key={e.id} in>
          <Grid item xs={6} lg={3} sm={4}>
            <Paper className={classes.paper}>
              <Card>
                <CardContent>
                  <Grid item xs={12} sm container>
                    <Grid item xs container>
                      <Typography color="primary" variant="h6" gutterBottom>
                        {e.device.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        gutterBottom
                        className={classes.truncate}
                      >
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
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          {moment(e.created_at).format('l')}
                        </Typography>
                      </Box>
                      <Box>
                        {isAdm() || isServiceByUser(e) ? (
                          <Button
                            onClick={() =>
                              history.push(`/services/messages/${e.id}`)
                            }
                          >
                            <ChatIcon color="action" />
                          </Button>
                        ) : null}
                        {isAdm() || isServiceByUser(e) ? (
                          <Button
                            onClick={() =>
                              openConfirmDialog(
                                'Confirmação',
                                'Deseja realmente arquivar o pedido de serviço?',
                                option => option && deleteService(e.id)
                              )
                            }
                          >
                            <ArchiveIcon color="secondary" />
                          </Button>
                        ) : null}
                      </Box>
                    </Box>
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
          <Button onClick={() => history.push('/services/add')}>
            <AddIcon color="primary" fontSize="large" />
          </Button>
        </Grid>
        <Grid item>
          <Box display={{ xs: 'block', sm: 'inline' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.archived}
                  onChange={event =>
                    setFilters({ ...filters, archived: event.target.checked })
                  }
                />
              }
              label="Arquivados"
            />
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
  service: state.service.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ServiceActions, ...LoginActions }, dispatch);

Services.propTypes = {
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categoryLoading: PropTypes.bool,
  locationLoading: PropTypes.bool,
  service: PropTypes.object.isRequired,
  serviceLoading: PropTypes.bool,
  getService: PropTypes.func.isRequired,
  openConfirmDialog: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  loadAll: PropTypes.func.isRequired,
};

Services.defaultProps = {
  categoryLoading: false,
  locationLoading: false,
  serviceLoading: false,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withConfirmDialog
)(Services);
