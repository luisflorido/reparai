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

import { Creators as CategoryActions } from "store/ducks/category";
import Loading from "components/Loading";
import withConfirmDialog from "components/ConfirmDialog";

const Categories = ({
  category,
  history,
  getCategory,
  deleteCategory,
  openConfirmDialog
}) => {
  useEffect(() => {
    getCategory();
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
  const { loading, data } = category;

  return (
    <Grid container xs={8}>
      <Typography variant="h4" className={classes.title}>
        Categorias
      </Typography>
      <Button
        className={classes.btn}
        onClick={() => history.push("/categories/add")}
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
                        option => option && deleteCategory(e.code)
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
  category: state.category
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoryActions, dispatch);

Categories.propTypes = {
  category: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  openConfirmDialog: PropTypes.func.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withConfirmDialog
)(Categories);
