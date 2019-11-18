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
import makeStyles from "@material-ui/styles/makeStyles";

import Loading from "components/Loading";
import { Creators as LocationActions } from "store/ducks/location";
import withConfirmDialog from "components/ConfirmDialog";

const Locations = ({
  locations,
  history,
  getLocation,
  deleteLocation,
  openConfirmDialog
}) => {
  useEffect(() => {
    getLocation();
  }, []);

  const useStyles = makeStyles({
    title: {
      display: "flex",
      justifyContent: "center"
    },
    btn: {
      marginLeft: "auto"
    }
  });

  const classes = useStyles();
  const { loading, data } = locations;

  return (
    <Grid container xs={8}>
      <Typography variant="h4" className={classes.title}>
        Localizações
      </Typography>
      <Button
        className={classes.btn}
        onClick={() => history.push("/locations/add")}
      >
        <AddIcon color="primary" fontSize="large" />
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data &&
            data.map(e => (
              <TableRow key={e.code}>
                <TableCell>{e.code}</TableCell>
                <TableCell>{e.name}</TableCell>
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
                        "Deseja realmente excluir a localização?",
                        option => option && deleteLocation(e.code)
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
  locations: state.location
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LocationActions, dispatch);

Locations.propTypes = {
  locations: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  openConfirmDialog: PropTypes.func.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withConfirmDialog
)(Locations);
