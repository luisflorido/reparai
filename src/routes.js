import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { store, persistor } from "store";
import Styles from "styles";
import "styles/global.css";

import Home from "views/Home";
import Login from "views/Login";
import ForgotPassword from "views/ForgotPassword";
import Register from "views/Register";

const history = createBrowserHistory({
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
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={250}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route path="/" exact component={Home} />
                        <Route
                          path="/forgot-password"
                          component={ForgotPassword}
                        />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </Router>
          </PersistGate>
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default Routes;
