import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUserAPI = async ({ email, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}api/token/`, { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

