import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
  name: null,
  email:null,
  userOnline:[],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
    },
    userData: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    userList: (state, action) => {
      state.userOnline = action.payload.userOnline;
    },
    
    logoutUser: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { loginUser,logoutUser,userData,userList } = userSlice.actions;

export default userSlice.reducer;