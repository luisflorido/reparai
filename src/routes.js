import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReduxToastr from "react-redux-toastr";

import { store, persistor } from "store";
import Styles from "styles";
import "styles/global.css";

import Drawer from "components/Drawer";
import PrivateRoute from "components/PrivateRoute";
import Home from "views/Home";
import Users from "views/Users";
import Categories from "views/Categories";
import AddCategory from "views/Categories/Add";
import Locations from "views/Locations";
import AddLocation from "views/Locations/Add";
import Devices from "views/Devices";
import AddDevice from "views/Devices/Add";
import Login from "views/Login";
import ForgotPassword from "views/ForgotPassword";
import Register from "views/Register";
import Services from "views/Services";
import AddService from "views/Services/Add";
import MessagesService from "views/Services/Messages";

export const history = createBrowserHistory({
  basename: window.location.pathname
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      paper: Styles.colors.dark[800],
      default: Styles.colors.dark[900]
    },
    primary: {
      main: Styles.colors.green[800],
      light: Styles.colors.green[500]
    }
  }
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Routes = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={Styles}>
      <Wrapper>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Router history={history}>
              <Route
                render={({ location }) => (
                  <Switch location={location}>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/" exact component={Home} />
                    <Drawer>
                      <PrivateRoute
                        path="/services"
                        exact
                        component={Services}
                      />
                      <PrivateRoute
                        path="/services/add"
                        exact
                        component={AddService}
                      />
                      <PrivateRoute
                        path="/services/messages/:id"
                        exact
                        component={MessagesService}
                      />
                      <PrivateRoute path="/users" exact component={Users} />
                      <PrivateRoute
                        path="/categories"
                        exact
                        component={Categories}
                      />
                      <PrivateRoute
                        path="/categories/add"
                        exact
                        component={AddCategory}
                      />
                      <PrivateRoute
                        path="/locations"
                        exact
                        component={Locations}
                      />
                      <PrivateRoute
                        path="/locations/add"
                        exact
                        component={AddLocation}
                      />
                      <PrivateRoute path="/devices" exact component={Devices} />
                      <PrivateRoute
                        path="/devices/add"
                        exact
                        component={AddDevice}
                      />
                    </Drawer>
                  </Switch>
                )}
              />
            </Router>
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position="top-right"
              getState={state => state.toast}
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
              closeOnToastrClick
            />
          </PersistGate>
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default Routes;
