import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") || null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
