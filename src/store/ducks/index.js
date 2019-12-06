import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import login from './login';
import register from './register';
import forgotPassword from './forgotPassword';
import category from './category';
import location from './location';
import device from './device';
import service from './service';
import setPassword from './setPassword';

const reducers = combineReducers({
  toast: toastrReducer,
  login,
  register,
  forgotPassword,
  category,
  location,
  device,
  service,
  setPassword,
});

export default reducers;
