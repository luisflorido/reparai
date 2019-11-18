import React from "react";

import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import { Formik } from "formik";
import * as yup from "yup";

import { Creators as LocationActions } from "store/ducks/location";
import Loading from "components/Loading";

const LocationAdd = ({ loading, addLocation }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      display: "flex",
      justifyContent: "center"
    },
    form: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column"
    }
  }));

  const classes = useStyles();

  const shape = yup.object().shape({
    code: yup
      .string()
      .required("Código necessário")
      .min(3),
    name: yup
      .string()
      .required("Nome necessário")
      .min(3)
  });

  return (
    <div>
      <Typography variant="h4" className={classes.style}>
        Adicionar localização
      </Typography>
      <Formik
        initialValues={{ code: "", name: "" }}
        validationSchema={shape}
        validateOnChange={false}
        onSubmit={values => addLocation(values)}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Grid xs={6} className={classes.form}>
            <FormControl className={classes.formControl} error={!!errors.code}>
              <InputLabel htmlFor="component-error">Código</InputLabel>
              <Input
                id="component-error"
                value={values.code}
                onChange={handleChange("code")}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">
                {errors.code}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={!!errors.name}>
              <InputLabel htmlFor="component-error">Nome</InputLabel>
              <Input
                id="component-error"
                value={values.name}
                onChange={handleChange("name")}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">
                {errors.name}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Criar
            </Button>
          </Grid>
        )}
      </Formik>
      <Loading loading={!!loading} />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.location.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LocationActions, dispatch);

LocationAdd.propTypes = {
  loading: PropTypes.bool.isRequired,
  addLocation: PropTypes.func.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(LocationAdd);
