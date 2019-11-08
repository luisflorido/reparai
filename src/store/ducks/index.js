import { combineReducers } from "redux";

import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";

const reducers = combineReducers({ login, register, forgotPassword });

export default reducers;
