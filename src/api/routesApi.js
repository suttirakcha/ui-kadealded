// import axios from "axios";

// export const authApi = axios.create({
//   baseURL: "http://localhost:8000/api",
//   withCredentials: true
// });

// export const adminApi = axios.create({
//   baseURL: "http://localhost:8000/admin",
//   withCredentials: true
// });

import { instance } from "./axios-config.js";

export const authApi = {
  get: (url, config) => instance.get(`/api${url}`, config),
  post: (url, data, config) => instance.post(`/api${url}`, data, config),
  put: (url, data, config) => instance.put(`/api${url}`, data, config),
  delete: (url, config) => instance.delete(`/api${url}`, config),
};

export const adminApi = {
  get: (url, config) => instance.get(`/admin${url}`, config),
  post: (url, data, config) => instance.post(`/admin${url}`, data, config),
  put: (url, data, config) => instance.put(`/admin${url}`, data, config),
  delete: (url, config) => instance.delete(`/admin${url}`, config),
};