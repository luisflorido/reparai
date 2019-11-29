import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import { Creators as RegisterActions } from 'store/ducks/register';
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
  container: {
    marginTop: theme.spacing(1),
  },
}));

const Register = ({ history, register, callRegister }) => {
  const classes = useStyles();
  useEffect(() => ipcRenderer.send(OPERATIONS.SHOW), []);

  const { loading, error } = register;

  useEffect(() => {
    if (!loading && error !== null) {
      if (!error) {
        history.push('/login');
      }
    }
  }, [loading, error]);

  const handleFormSubmit = values => {
    callRegister(values);
  };

  const schema = Yup.object().shape({
    first_name: Yup.string()
      .min(4)
      .required('Nome necessário'),
    last_name: Yup.string()
      .min(4)
      .required('Sobrenome necessário'),
    email: Yup.string()
      .email('Digite um email válido')
      .required('Email necessário.'),
    password: Yup.string()
      .min(6)
      .required('Senha necessária.'),
    confirm_password: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Senhas não conferem.'
    ),
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
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
            Registrar
          </Typography>
          <Formik
            className={classes.form}
            initialValues={{
              first_name: 'Luis',
              last_name: 'Guilherme',
              email: 'luiisflorido@gmail.com',
              password: '123456',
              confirm_password: '123456',
            }}
            validationSchema={schema}
            validateOnChange={false}
            onSubmit={values => handleFormSubmit(values)}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <Grid
                  container
                  justify="space-between"
                  className={classes.container}
                >
                  <Grid xs={5}>
                    <FormControl
                      className={classes.formControl}
                      error={!!errors.first_name}
                    >
                      <InputLabel htmlFor="component-error">Nome</InputLabel>
                      <Input
                        id="component-error"
                        variant="outlined"
                        value={values.first_name}
                        onChange={handleChange('first_name')}
                        fullWidth
                        aria-describedby="component-error-text"
                      />
                      <FormHelperText id="component-error-text">
                        {errors.first_name}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid xs={5}>
                    <FormControl
                      className={classes.formControl}
                      error={!!errors.last_name}
                    >
                      <InputLabel htmlFor="component-error">
                        Sobrenome
                      </InputLabel>
                      <Input
                        id="component-error"
                        variant="outlined"
                        value={values.last_name}
                        onChange={handleChange('last_name')}
                        fullWidth
                        aria-describedby="component-error-text"
                      />
                      <FormHelperText id="component-error-text">
                        {errors.last_name}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl
                  className={classes.formControl}
                  error={!!errors.email}
                >
                  <InputLabel htmlFor="component-error">Email</InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange('email')}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.email}
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
                  error={!!errors.confirm_password}
                >
                  <InputLabel htmlFor="component-error">
                    Confirmar senha
                  </InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    type="password"
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.confirm_password}
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
                  Registrar
                </Button>
              </>
            )}
          </Formik>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

Register.propTypes = {
  register: PropTypes.object.isRequired,
  callRegister: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  register: state.register,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(RegisterActions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Register);
