// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
