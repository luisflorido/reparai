import axios from "axios";

export const token = localStorage.getItem("token") || null;

export const api = axios.create({
  baseURL: "http://localhost:3333"
});

api.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
