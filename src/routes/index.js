import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { store, persistor } from "store";

import Home from "components/Home";

const history = createBrowserHistory();

const Routes = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);

export default Routes;
