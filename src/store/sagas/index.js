import { all, call, put, takeLatest } from "redux-saga/effects";
import { api } from "services";

import {
  Creators as LoginActions,
  Types as LoginTypes
} from "store/ducks/login";
import {
  Creators as RegisterActions,
  Types as RegisterTypes
} from "store/ducks/register";
import {
  Creators as ForgotPasswordActions,
  Types as ForgotPasswordTypes
} from "store/ducks/forgotPassword";

function* login(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(api.post, "/auth", { email, password });

    const {
      status,
      data: { data }
    } = response;
    if (status && status === 200) {
      yield put(LoginActions.loginSuccess(data));
    } else {
      yield put(LoginActions.loginFail(status));
    }
  } catch (err) {
    const { response } = err;
    if (response && response.status) {
      yield put(LoginActions.loginFail(response.status));
    } else {
      yield put(LoginActions.loginFail(-1));
    }
  }
}

function* register(action) {
  const { name, email, password } = action.payload;
  try {
    const response = yield call(api.post, "/users", { name, email, password });

    const { status } = response;
    if (status && status === 200) {
      yield put(RegisterActions.registerSuccess());
    } else {
      yield put(RegisterActions.registerFail(status));
    }
  } catch (err) {
    const { response } = err;
    if (response && response.status) {
      yield put(RegisterActions.registerFail(response.status));
    } else {
      yield put(RegisterActions.registerFail(-1));
    }
  }
}

function* forgotPassword(action) {
  const { email } = action.payload;
  try {
    const response = yield call(api.post, "/users/forgot-password", { email });

    const { status } = response;
    if (status && status === 200) {
      yield put(ForgotPasswordActions.forgotPasswordSuccess());
    } else {
      yield put(ForgotPasswordActions.forgotPasswordFail(status));
    }
  } catch (err) {
    const { response } = err;
    if (response && response.status) {
      yield put(ForgotPasswordActions.forgotPasswordFail(response.status));
    } else {
      yield put(ForgotPasswordActions.forgotPasswordFail(-1));
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.LOGIN, login),
    takeLatest(RegisterTypes.REGISTER, register),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD, forgotPassword)
  ]);
}
