import React from 'react';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/styles/makeStyles';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Creators as ServiceActions } from 'store/ducks/service';
import Loading from 'components/Loading';

const ServiceAdd = ({ loading, addService, devices, category, locations }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
  }));

  const classes = useStyles();

  const shape = yup.object().shape({
    device_id: yup.number().required('Dispositivo necessário'),
    description: yup
      .string()
      .required('Descrição necessário')
      .min(15, 'Escreva ao menos 15 caracteres'),
    categories_code: yup.array(),
    locations_code: yup.array(),
  });

  const filterDevices = (devices, locations, categories) => {
    return devices
      .filter(e =>
        categories.every(v => e.categories.map(f => f.code).indexOf(v) > -1)
      )
      .filter(e =>
        locations.every(v => e.locations.map(f => f.code).indexOf(v) > -1)
      )
      .map(e => (
        <MenuItem key={e.id} value={e.id}>
          {e.name}
        </MenuItem>
      ));
  };

  return (
    <div>
      <Typography variant="h4" className={classes.style}>
        Adicionar pedido de serviço
      </Typography>
      <Formik
        initialValues={{
          device_id: undefined,
          description: '',
          categories_code: [],
          locations_code: [],
        }}
        validationSchema={shape}
        validateOnChange={false}
        onSubmit={values => addService(values)}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Grid xs={6} className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">
                Filtro de categorias
              </InputLabel>
              <Select
                multiple
                value={values.categories_code}
                onChange={handleChange('categories_code')}
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
              <InputLabel id="demo-mutiple-chip-label">
                Filtro de localizações
              </InputLabel>
              <Select
                multiple
                value={values.locations_code}
                onChange={handleChange('locations_code')}
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
            <FormControl error={!!errors.device_id}>
              <InputLabel>Dispositivo</InputLabel>
              <Select
                id="device-id"
                value={values.device_id}
                onChange={handleChange('device_id')}
              >
                {filterDevices(
                  devices,
                  values.locations_code,
                  values.categories_code
                )}
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
                onChange={handleChange('description')}
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
  devices: state.device.data,
  category: state.category.data,
  locations: state.location.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ServiceActions, dispatch);

ServiceAdd.propTypes = {
  loading: PropTypes.bool,
  addService: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
};

ServiceAdd.defaultProps = {
  loading: false,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(ServiceAdd);
