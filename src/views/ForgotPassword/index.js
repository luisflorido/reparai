import React, { useEffect } from "react";

import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Creators as ForgtoPasswordActions } from "store/ducks/forgotPassword";
import PropTypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Formik } from "formik";
import * as Yup from "yup";

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

const ForgotPassword = ({ history, forgotPassword, callForgotPassword }) => {
  const classes = useStyles();
  useEffect(() => ipcRenderer.send(OPERATIONS.SHOW), []);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um email válido")
      .required("Email necessário")
  });

  const handleFormSubmit = values => {
    callForgotPassword(values);
  };

  const { loading, error, errorStatus } = forgotPassword;

  useEffect(() => {
    if (!loading && error !== null) {
      if (!error) {
        alert("Email enviado com sucesso!");
        history.push("/login");
      } else {
        alert(
          errorStatus === 404
            ? "Usuário inválido."
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
            Esqueceu sua senha
          </Typography>
          <Formik
            className={classes.form}
            initialValues={{
              email: "luiisflorido@gmail.com"
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
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.object.isRequired,
  callForgotPassword: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ForgtoPasswordActions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(ForgotPassword);
