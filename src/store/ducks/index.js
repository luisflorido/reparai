import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import category from "./category";
import location from "./location";
import device from "./device";
import service from "./service";

const reducers = combineReducers({
  toast: toastrReducer,
  login,
  register,
  forgotPassword,
  category,
  location,
  device,
  service
});

export default reducers;
