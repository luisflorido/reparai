import axios from "axios";

import { Types as LoginTypes } from "store/ducks/login";

export const getToken = () => {
  const data = localStorage.getItem("data");
  if (data) {
    const dataObject = JSON.parse(data);
    if (dataObject.token && dataObject.token.token) {
      return dataObject.token.token;
    }
  }
  return null;
};

export const api = axios.create({
  baseURL: "http://localhost:3333"
});

api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default {
  setupInterceptor: store => {
    api.interceptors.response.use(
      request => request,
      error => {
        if (error && error.response && error.response.status) {
          const { response } = error;
          const { status } = response;
          if (status === 401) {
            store.dispatch({ type: LoginTypes.LOGOUT });
          }
        }
        return Promise.reject(error);
      }
    );
  }
};
