import React, { useEffect } from "react";

import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Table from "@material-ui/core/Table";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/AddCircle";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/styles/makeStyles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import { Creators as DeviceActions } from "store/ducks/device";
import Loading from "components/Loading";
import withConfirmDialog from "components/ConfirmDialog";

const Devices = ({
  device,
  history,
  getDevice,
  deleteDevice,
  openConfirmDialog
}) => {
  useEffect(() => {
    getDevice();
  }, []);

  const useStyles = makeStyles({
    title: {
      display: "flex",
      justifyContent: "center"
    },
    btn: {
      marginLeft: "auto"
    },
    category: {
      backgroundColor: purple[500]
    },
    location: {
      backgroundColor: green[500]
    }
  });

  const classes = useStyles();
  const { loading, data } = device;

  return (
    <Grid container xs={10}>
      <Typography variant="h4" className={classes.title}>
        Dispositivos
      </Typography>
      <Button
        className={classes.btn}
        onClick={() => history.push("/devices/add")}
      >
        <AddIcon color="primary" fontSize="large" />
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>MAC</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Categorias</TableCell>
            <TableCell>Localizações</TableCell>
            <TableCell>Ativo</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data &&
            data.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.mac}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                  {e.categories.map(e => (
                    <Chip
                      size="small"
                      key={e.name}
                      label={e.name}
                      className={classes.category}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  {e.locations.map(e => (
                    <Chip
                      size="small"
                      key={e.name}
                      label={e.name}
                      className={classes.location}
                    />
                  ))}
                </TableCell>
                <TableCell>{e.active ? "SIM" : "NÃO"}</TableCell>
                <TableCell>
                  <Button>
                    <CreateIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      openConfirmDialog(
                        "Confirmação",
                        "Deseja realmente excluir o dispositivo?",
                        option => option && deleteDevice(e.id)
                      )
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Loading loading={!!loading} />
    </Grid>
  );
};

const mapStateToProps = state => ({
  device: state.device
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(DeviceActions, dispatch);

Devices.propTypes = {
  device: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getDevice: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  openConfirmDialog: PropTypes.func.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withConfirmDialog
)(Devices);
