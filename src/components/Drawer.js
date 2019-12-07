import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Person from '@material-ui/icons/Person';
import Category from '@material-ui/icons/LocalOffer';
import Locations from '@material-ui/icons/MyLocation';
import Devices from '@material-ui/icons/Devices';
import Logout from '@material-ui/icons/ExitToApp';
import Assignment from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { compose } from 'redux';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selected: {
    backgroundColor: theme.palette.background.default,
  },
  font: {
    fontFamily: 'Quillain',
  },
}));

function ResponsiveDrawer(props) {
  const { children, history, login } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isInPath = name => {
    const {
      location: { pathname },
    } = history;
    return pathname.startsWith(name);
  };

  const equalsPath = name => {
    const {
      location: { pathname },
    } = history;
    return pathname === name;
  };

  const isAdmin = () => {
    if (login) {
      const parsed = JSON.parse(login);
      return parsed.roles.find(e => e === 'adm');
    }
    return false;
  };

  const getName = () => {
    if (login) {
      const parsed = JSON.parse(login);
      const {
        user: { first_name, last_name },
      } = parsed;
      return `${first_name} ${last_name}`;
    }
    return false;
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Grid container>
          <Grid item sm={12}>
            <Typography variant="h4" align="center" className={classes.font}>
              Reparaí
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="body2">{getName()}</Typography>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          className={isInPath('/services') && classes.selected}
          onClick={() => !equalsPath('/services') && history.push('/services')}
        >
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Serviços" />
        </ListItem>
        {isAdmin() && (
          <ListItem
            button
            className={isInPath('/users') && classes.selected}
            onClick={() => !equalsPath('/users') && history.push('/users')}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
        )}
        {isAdmin() && (
          <ListItem
            button
            className={isInPath('/categories') && classes.selected}
            onClick={() =>
              !equalsPath('/categories') && history.push('/categories')
            }
          >
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
        )}
        {isAdmin() && (
          <ListItem
            button
            className={isInPath('/locations') && classes.selected}
            onClick={() =>
              !equalsPath('/locations') && history.push('/locations')
            }
          >
            <ListItemIcon>
              <Locations />
            </ListItemIcon>
            <ListItemText primary="Localizações" />
          </ListItem>
        )}
        {isAdmin() && (
          <ListItem
            button
            className={isInPath('/devices') && classes.selected}
            onClick={() => !equalsPath('/devices') && history.push('/devices')}
          >
            <ListItemIcon>
              <Devices />
            </ListItemIcon>
            <ListItemText primary="Dispositivos" />
          </ListItem>
        )}
      </List>
      <Divider />
      <ListItem
        button
        onClick={() => {
          localStorage.removeItem('data');
          window.location.reload();
        }}
      >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Deslogar" />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.element.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  login: state.login.data,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(ResponsiveDrawer);
