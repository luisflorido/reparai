import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Table from '@material-ui/core/Table';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

const Users = () => {
  const useStyles = makeStyles({
    title: {
      display: 'flex',
      justifyContent: 'center',
    },
    btn: {
      marginLeft: 'auto',
    },
  });

  const classes = useStyles();

  return (
    <Grid container xs={8}>
      <Typography variant="h4" className={classes.title}>
        Usuários
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Sobrenome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Cargo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Luis</TableCell>
            <TableCell>Flórido</TableCell>
            <TableCell>luiisflorido@gmail.com</TableCell>
            <TableCell></TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};

const mapStateToProps = state => ({});

Users.propTypes = {
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withRouter
)(Users);
