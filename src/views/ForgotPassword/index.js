import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import { Creators as LoginActions } from "store/ducks/login";
import PropTypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

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
  }
}));

const ForgotPassword = ({ history }) => {
  const classes = useStyles();
  useEffect(() => ipcRenderer.send(OPERATIONS.SHOW), []);

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
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enviar email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => history.push("/login")} variant="body2">
                  Logar
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => history.push("/register")} variant="body2">
                  Não tem uma conta?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

ForgotPassword.propTypes = {
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
)(ForgotPassword);
