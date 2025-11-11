import api from "../helpers/apiHelper.js"; 

export const getAllRolesAPI = async () => {
  try {
    const response = await api.get("/api/roles/all-roles/");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error.response?.data || error;
  }
};
