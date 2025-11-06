import axios from "axios";
import { toast } from "react-toastify";
import store from "../providers/store.js"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  let token = store.getState()?.auth?.token; 
  if (!token) token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    let message = "Something went wrong!";
    if (data?.error) message = data.error;
    else if (data?.detail) message = data.detail;
    else if (data?.message) message = data.message;
    else if (typeof data === "string") message = data;
    else if (status === 400) message = "Invalid data — please check your input.";
    else if (status === 401) message = "Unauthorized — please log in again.";
    else if (status === 403) message = "Access denied — you don’t have permission.";
    else if (status === 404) message = "Requested resource not found.";

    toast.error(message);
    return Promise.reject(error);
  }
);

export const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};


export default api;
