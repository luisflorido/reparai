import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import { api } from "services";
import { toastr } from "react-redux-toastr";

import { history } from "routes";

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
import {
  Creators as CategoryActions,
  Types as CategoryTypes
} from "store/ducks/category";
import {
  Creators as LocationActions,
  Types as LocationTypes
} from "store/ducks/location";
import {
  Creators as DeviceActions,
  Types as DeviceTypes
} from "store/ducks/device";

function* login(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(api.post, "/auth", { email, password });

    const { status, data } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Logado com sucesso!");
      yield put(LoginActions.loginSuccess(data.data));
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 404
        ? "Usuário ou senha inválidos!"
        : "Falha ao contactar os servidores."
    );
    yield put(LoginActions.loginFail());
  }
}

function* register(action) {
  const { name, email, password } = action.payload;
  try {
    const response = yield call(api.post, "/users", { name, email, password });

    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Registrado com sucesso!");
      yield put(RegisterActions.registerSuccess());
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 409
        ? "E-mail já cadastrado."
        : "Falha ao contactar os servidores."
    );
    yield put(RegisterActions.registerFail());
  }
}

function* forgotPassword(action) {
  const { email } = action.payload;
  try {
    const response = yield call(api.post, "/users/forgot-password", { email });

    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "E-mail enviado com sucesso!");
      yield put(ForgotPasswordActions.forgotPasswordSuccess());
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 404
        ? "E-mail não encontrado."
        : "Falha ao contactar os servidores."
    );
    yield put(ForgotPasswordActions.forgotPasswordFail());
  }
}

function* getCategory() {
  try {
    const response = yield call(api.get, "/categories");
    const { status, data } = response;
    if (status && status === 200) {
      yield put(CategoryActions.categorySuccess({ data }));
    }
  } catch (err) {
    toastr.error(
      "Erro ao obter categorias",
      "Falha ao contactar os servidores."
    );
    yield put(CategoryActions.categoryFail());
  }
}

function* addCategory(payload) {
  try {
    const response = yield call(api.post, "/categories", payload.payload);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Categoria criada com sucesso.");
      yield put(CategoryActions.categorySuccess());
      setTimeout(() => history.push("/categories"), 2500);
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 409
        ? "Categoria com código já existente."
        : "Falha ao contactar os servidores."
    );
    yield put(CategoryActions.categoryFail());
  }
}

function* deleteCategory(payload) {
  try {
    const response = yield call(api.delete, `/categories/${payload.payload}`);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Categoria deletada com sucesso.");
      yield put(CategoryActions.categorySuccess());
      setTimeout(() => {
        history.replace("/");
        history.replace("/categories");
      }, 2500);
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 404
        ? "Categoria com código inválido."
        : "Falha ao contactar os servidores."
    );
    yield put(CategoryActions.categoryFail());
  }
}

function* getLocation() {
  try {
    const response = yield call(api.get, "/locations");
    const { status, data } = response;
    if (status && status === 200) {
      yield put(LocationActions.locationSuccess({ data }));
    }
  } catch (err) {
    toastr.error("Erro ao obter locais", "Falha ao contactar os servidores.");
    yield put(LocationActions.locationFail());
  }
}

function* addLocation(payload) {
  try {
    const response = yield call(api.post, "/locations", payload.payload);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Localização criada com sucesso.");
      yield put(LocationActions.locationSuccess());
      setTimeout(() => history.push("/locations"), 2500);
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 409
        ? "Localização com código já existente."
        : "Falha ao contactar os servidores."
    );
    yield put(LocationActions.locationFail());
  }
}

function* deleteLocation(payload) {
  try {
    const response = yield call(api.delete, `/locations/${payload.payload}`);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Localização deletada com sucesso.");
      yield put(LocationActions.locationSuccess());
      setTimeout(() => {
        history.replace("/");
        history.replace("/locations");
      }, 2500);
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 404
        ? "Localização com código inválido."
        : "Falha ao contactar os servidores."
    );
    yield put(LocationActions.locationFail());
  }
}

function* getDevice() {
  try {
    const response = yield call(api.get, "/devices");
    const { status, data } = response;
    if (status && status === 200) {
      yield put(DeviceActions.deviceSuccess({ data }));
    }
  } catch (err) {
    toastr.error(
      "Erro ao obter dispositivos",
      "Falha ao contactar os servidores."
    );
    yield put(DeviceActions.deviceFail());
  }
}

function* addDevice(payload) {
  try {
    const response = yield call(api.post, "/devices", payload.payload);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Dispositivo criado com sucesso.");
      yield put(DeviceActions.deviceSuccess());
      setTimeout(() => history.push("/devices"), 2500);
    }
  } catch (err) {
    toastr.error("Erro", "Falha ao contactar os servidores.");
    yield put(DeviceActions.deviceFail());
  }
}

function* deleteDevice(payload) {
  try {
    const response = yield call(api.delete, `/devices/${payload.payload}`);
    const { status } = response;
    if (status && status === 200) {
      toastr.success("Sucesso", "Dispositivo deletado com sucesso.");
      yield put(DeviceActions.deviceSuccess());
      setTimeout(() => {
        history.replace("/");
        history.replace("/devices");
      }, 2500);
    }
  } catch (err) {
    toastr.error(
      "Erro",
      err && err.response && err.response.status && err.response.status === 404
        ? "Dispositivo com id inválido."
        : "Falha ao contactar os servidores."
    );
    yield put(DeviceActions.deviceFail());
  }
}

function* loadAllCategories() {
  try {
    const response = yield call(api.get, "/categories");
    const { status, data } = response;
    if (status && status === 200) {
      yield put(CategoryActions.categorySuccess({ data }));
    }
  } catch (err) {
    toastr.error("Erro ao carregar categorias");
    yield put(CategoryActions.categoryFail());
  }
}

function* loadAllLocations() {
  try {
    const response = yield call(api.get, "/locations");
    const { status, data } = response;
    if (status && status === 200) {
      yield put(LocationActions.locationSuccess({ data }));
    }
  } catch (err) {
    toastr.error("Erro ao carregar localizações");
    yield put(LocationActions.locationFail());
  }
}

function* loadAll() {
  yield all([call(loadAllCategories), call(loadAllLocations)]);
}

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.LOGIN, login),
    takeLatest(RegisterTypes.REGISTER, register),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD, forgotPassword),
    takeLatest(CategoryTypes.GET, getCategory),
    takeLatest(CategoryTypes.ADD, addCategory),
    takeLatest(CategoryTypes.DELETE, deleteCategory),
    takeLatest(LocationTypes.GET, getLocation),
    takeLatest(LocationTypes.ADD, addLocation),
    takeLatest(LocationTypes.DELETE, deleteLocation),
    takeLatest(DeviceTypes.GET, getDevice),
    takeLatest(DeviceTypes.ADD, addDevice),
    takeLatest(DeviceTypes.DELETE, deleteDevice),
    fork(loadAll)
  ]);
}
