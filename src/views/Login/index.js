import React, { useEffect } from "react";

import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Creators as LoginActions } from "store/ducks/login";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";

import { OPERATIONS } from "store/sagas/entitiesType";

const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paperBackground: {
    backgroundColor: theme.palette.background.default
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    width: "100%"
  }
}));

const Login = ({ history, login, callLogin }) => {
  const classes = useStyles();
  useEffect(() => ipcRenderer.send(OPERATIONS.SHOW), []);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um email válido")
      .required("Email necessário"),
    password: Yup.string()
      .min(6, "Senha precisa de 6 caracteres")
      .required("Senha necessária")
  });

  const handleFormSubmit = values => {
    callLogin(values);
  };

  const { loading, error, errorStatus } = login;

  useEffect(() => {
    if (!loading && error !== null) {
      if (!error) {
        alert("Logado com sucesso.");
        history.push("/");
      } else {
        alert(
          errorStatus === 401
            ? "Usuário ou senha inválidos."
            : "Ocorreu um erro! Tente novamente mais tarde."
        );
      }
    }
  }, [loading, error]);

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
            Login
          </Typography>
          <Formik
            className={classes.form}
            initialValues={{
              email: "luiisflorido@gmail.com",
              password: "123456"
            }}
            validationSchema={schema}
            validateOnChange={false}
            onSubmit={values => handleFormSubmit(values)}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <FormControl
                  className={classes.formControl}
                  error={!!errors.email}
                >
                  <InputLabel htmlFor="component-error">Email</InputLabel>
                  <Input
                    id="component-error"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange("email")}
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
                    onChange={handleChange("password")}
                    fullWidth
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {errors.password}
                  </FormHelperText>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar?"
                />
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
                onClick={() => history.push("/forgot-password")}
                variant="body2"
              >
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => history.push("/register")} variant="body2">
                Não tem uma conta?
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.object.isRequired,
  callLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginActions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Login);
