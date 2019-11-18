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
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik } from "formik";
import * as yup from "yup";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import { Creators as DeviceActions } from "store/ducks/device";
import Loading from "components/Loading";

const DeviceAdd = ({ category, locations, loading, addDevice }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      display: "flex",
      justifyContent: "center"
    },
    form: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column"
    },
    category: {
      backgroundColor: purple[500]
    },
    location: {
      backgroundColor: green[500]
    }
  }));

  const classes = useStyles();

  const shape = yup.object().shape({
    mac: yup.string().min(17),
    name: yup
      .string()
      .required("Nome necessário")
      .min(3),
    categories_code: yup.array(),
    locations_code: yup.array()
  });

  return (
    <div>
      <Typography variant="h4" className={classes.style}>
        Adicionar dispositivo
      </Typography>
      <Formik
        initialValues={{ mac: "", name: "", categories_code: [], locations_code: [] }}
        validationSchema={shape}
        validateOnChange={false}
        onSubmit={values => addDevice(values)}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Grid xs={6} className={classes.form}>
            <FormControl className={classes.formControl} error={!!errors.mac}>
              <InputLabel htmlFor="component-error">MAC</InputLabel>
              <Input
                value={values.mac}
                onChange={handleChange("mac")}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">
                {errors.mac}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={!!errors.name}>
              <InputLabel htmlFor="component-error">Nome</InputLabel>
              <Input
                value={values.name}
                onChange={handleChange("name")}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">
                {errors.name}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Categorias</InputLabel>
              <Select
                multiple
                value={values.categories_code}
                onChange={handleChange("categories_code")}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected =>
                  selected.map(value => {
                    const name = category.find(e => e.code === value).name;
                    return (
                      <Chip
                        key={name}
                        label={name}
                        className={classes.category}
                      />
                    );
                  })
                }
              >
                {category.map(cat => (
                  <MenuItem key={cat.code} value={cat.code}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Localizações</InputLabel>
              <Select
                multiple
                value={values.locations_code}
                onChange={handleChange("locations_code")}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected =>
                  selected.map(value => {
                    const name = locations.find(e => e.code === value).name;
                    return (
                      <Chip
                        key={name}
                        label={name}
                        className={classes.location}
                      />
                    );
                  })
                }
              >
                {locations.map(loc => (
                  <MenuItem key={loc.code} value={loc.code}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
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
  loading: state.device.loading,
  category: state.category.data,
  locations: state.location.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(DeviceActions, dispatch);

DeviceAdd.propTypes = {
  loading: PropTypes.bool,
  addDevice: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired
};

DeviceAdd.defaultProps = {
  loading: false
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(DeviceAdd);
