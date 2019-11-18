import React from "react";

import { getToken } from "services";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ ...rest }) =>
  getToken() ? <Route {...rest} /> : <Redirect to={{ pathname: "/login" }} />;

export default PrivateRoute;
