import api from "../helpers/apiHelper.js";

export const createUserAPI = async (userData) => {
  const res = await api.post("api/admin/users/create/", userData);
  console.log("Create User Response:", res.data);
  return res.data;
};

export const updateUserAPI = async (id, userData) => {
  const res = await api.put(`api/admin/users/${id}/`, userData);
  console.log(" Update User Response:", res.data);
  return res.data;
};

export const getAllUsersAPI = async () => {
  const res = await api.get("api/admin/users/");
  console.log(" Users API Response:", res.data);
  return res.data;
};

export const deleteUserAPI = async (id) => {
  const res = await api.delete(`api/admin/users/${id}/`);
  console.log(" Delete User Response:", res.data);
  return res.data;
};
