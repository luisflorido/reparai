import React, { useEffect } from 'react';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Creators as SetPasswordActions } from 'store/ducks/setPassword';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { OPERATIONS } from 'store/sagas/entitiesType';

const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paperBackground: {
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%',
  },
}));

const SetPassword = ({ history, setPassword, callSetPassword }) => {
  const classes = useStyles();
  useEffect(() => ipcRenderer.send(OPERATIONS.SHOW), []);

  const schema = Yup.object().shape({
    token: Yup.string().required('Token necessário'),
    password: Yup.string().required('Senha necessária'),
    password_confirmation: Yup.string()
      .required('Confirmação de senha necessária')
      .oneOf([Yup.ref('password'), null], 'Senhas não conferem.'),
  });

  const handleFormSubmit = values => {
    callSetPassword(values);
  };

  const { loading } = setPassword;

  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        component={Paper}
        elevation={6}
        square
        className={classes.paperBackground}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Setar senha
          </Typography>
          <Formik
            className={classes.form}
            initialValues={{
              token: '',
              password: '',
              password_confirmation: '',
            }}
            validationSchema={schema}
            validateOnChange={false}
            onSubmit={values => handleFormSubmit(values)}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <FormControl
                  className={classes.formControl}
                  error={!!errors.token}
                >
                  <InputLabel htmlFor="component-error">Token</InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    value={values.token}
                    onChange={handleChange('token')}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.token}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  error={!!errors.password}
                >
                  <InputLabel htmlFor="component-error">Senha</InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    onChange={handleChange('password')}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.password}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  error={!!errors.password_confirmation}
                >
                  <InputLabel htmlFor="component-error">
                    Confirmação da senha
                  </InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    type="password"
                    value={values.password_confirmation}
                    onChange={handleChange('password_confirmation')}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.password_confirmation}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={() => handleSubmit()}
                  className={classes.submit}
                >
                  Entrar
                </Button>
              </>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => history.push('/set-password')}
                variant="body2"
              >
                Já possui um token?
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

SetPassword.propTypes = {
  setPassword: PropTypes.object.isRequired,
  callSetPassword: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  setPassword: state.setPassword,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SetPasswordActions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(SetPassword);
