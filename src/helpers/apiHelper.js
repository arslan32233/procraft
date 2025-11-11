import axios from "axios";
import store from "../providers/store.js"; 

const BASE_URL = import.meta.env.VITE_BASE_URL
const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use((config) => {
  const token = store.getState()?.auth?.token || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
