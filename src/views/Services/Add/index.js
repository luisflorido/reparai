import React from "react";

import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import { Formik } from "formik";
import * as yup from "yup";

import { Creators as ServiceActions } from "store/ducks/service";
import Loading from "components/Loading";

const ServiceAdd = ({ loading, addService, devices }) => {
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
    device_id: yup.number().required("Dispositivo necessário"),
    description: yup
      .string()
      .required("Descrição necessário")
      .min(15, "Escreva ao menos 15 caracteres")
  });

  return (
    <div>
      <Typography variant="h4" className={classes.style}>
        Adicionar pedido de serviço
      </Typography>
      <Formik
        initialValues={{ device_id: undefined, description: "" }}
        validationSchema={shape}
        validateOnChange={false}
        onSubmit={values => addService(values)}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Grid xs={6} className={classes.form}>
            <FormControl error={!!errors.device_id}>
              <InputLabel>Dispositivo</InputLabel>
              <Select
                id="device-id"
                value={values.device_id}
                onChange={handleChange("device_id")}
              >
                {devices.map(e => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="component-error-text">
                {errors.device_id}
              </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.description}>
              <InputLabel htmlFor="component-error">
                Descrição do problema:
              </InputLabel>
              <Input
                id="component-error"
                value={values.description}
                onChange={handleChange("description")}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">
                {errors.description}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Enviar pedido
            </Button>
          </Grid>
        )}
      </Formik>
      <Loading loading={!!loading} />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.service.loading,
  devices: state.device.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ServiceActions, dispatch);

ServiceAdd.propTypes = {
  loading: PropTypes.bool,
  addService: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired
};

ServiceAdd.defaultProps = {
  loading: false
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(ServiceAdd);
