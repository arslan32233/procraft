import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

export const getAllRolesAPI = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/roles/all-roles/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error.response?.data || error;
  }
};
