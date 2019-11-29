import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import classNames from 'classnames';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import makeStyles from '@material-ui/styles/makeStyles';
import { animateScroll } from 'react-scroll';
import moment from 'moment/min/moment-with-locales';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Creators as ServiceActions } from 'store/ducks/service';
import Loading from 'components/Loading';

import { OPERATIONS } from 'store/sagas/entitiesType';
const { ipcRenderer } = window.require('electron');

const ServiceMessages = ({
  loading,
  getServiceById,
  service,
  match,
  sendMessage,
}) => {
  const [description, setDescription] = useState();
  const {
    params: { id },
  } = match;

  useEffect(() => {
    moment.locale('pt-br');

    const {
      params: { id },
    } = match;

    if (id) {
      getServiceById({ id });
    }
  }, []);

  useEffect(() => {
    if (service) {
      animateScroll.scrollToBottom({
        delay: 200,
        duration: 800,
        containerId: 'chat',
      });
    }
  }, [service]);

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3),
    },
    gridPaper: {
      display: 'flex',
      marginBottom: `${theme.spacing(1)}px`,
    },
    paper: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(4),
    },
    admin: {
      marginRight: 'auto',
    },
    user: {
      marginLeft: 'auto',
    },
    title: {
      padding: theme.spacing(1),
      margin: '0 auto',
      marginBottom: theme.spacing(4),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    btn: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
      borderRadius: '10px',
    },
    send: {
      marginTop: theme.spacing(1),
    },
    divider: {
      width: '100%',
    },
    chat: {
      overflowY: 'auto',
      height: '60vh',
    },
    name: {
      marginRight: theme.spacing(1),
    },
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '11rem',
    },
  }));

  const classes = useStyles();

  const isAnswer = actualId => {
    const defaultUserId = service.user.id;
    return actualId === defaultUserId;
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Paper className={classes.title}>
          <Typography variant="h5">
            {!!service && !!service.device && service.device.name.toUpperCase()}
          </Typography>
        </Paper>
        <Grid id="chat" className={classes.chat} container spacing={3}>
          {!!service &&
            !!service.messages &&
            service.messages.map(e => (
              <Grid className={classes.gridPaper} item xs={12} key={e.id}>
                <Paper
                  className={classNames(
                    classes.paper,
                    isAnswer(e.user.id) ? classes.admin : classes.user
                  )}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar>
                        {e.user.first_name.substring(0, 1).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Grid container>
                        <Grid item xs className={classes.name}>
                          <Typography variant="subtitle1" color="primary">
                            {e.user.first_name} {e.user.last_name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">
                            {moment(e.created_at).format('LLL')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="subtitle2"
                        className={classes.truncate}
                      >
                        {e.text}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <Grid container spacing={3} className={classes.send}>
          <Grid item xs={10}>
            <TextField
              id="standard-multiline-static"
              label="Mensagem"
              multiline
              rows="2"
              variant="filled"
              value={description}
              onChange={evt => setDescription(evt.target.value)}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.btn}
              color="primary"
            >
              <Button
                onClick={() => {
                  if (description) {
                    sendMessage({ id, text: description });
                    setDescription();
                  }
                }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Loading loading={!!loading} />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.service.loading,
  service: state.service.service,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ServiceActions, dispatch);

ServiceMessages.propTypes = {
  loading: PropTypes.bool,
  getServiceById: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

ServiceMessages.defaultProps = {
  loading: false,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(ServiceMessages);
