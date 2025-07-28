import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true
});

export const adminApi = axios.create({
  baseURL: "http://localhost:8000/admin",
  withCredentials: true
});