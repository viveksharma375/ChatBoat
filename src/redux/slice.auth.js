import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  userOnline: [],
  chats: [],
  connectedUsers: [],
  groups: [],
  layout: "light",
  activeTab: null,
  activeChat: null,
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
    },
    userData: (state, action) => {
      const { profilePath } = action.payload;
      if (profilePath !== undefined) {
        state.user.profilePath = profilePath;
      } else {
        state.user = { ...state.user, ...action.payload.user };
      }
    },
    userList: (state, action) => {
      state.userOnline = action.payload.userOnline;
      state.chats = action.payload.userChats;
      state.groups = action.payload.groups;
    },
    userLayout: (state, action) => {
      state.layout = action.payload.layout;
    },
    userActiveTab: (state, action) => {
      state.activeTab = action.payload.activeTab;
    },
    userActiveChat: (state, action) => {
      state.activeChat = action.payload.activeChat;
    },
    userConnected: (state, action) => {
      state.connectedUsers = action.payload.connectedUsers;
    },

    userAll: (state, action) => {
      state.allUser = action.payload.allUser;
    },

    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.userOnline = [];
      state.chats = [];
      state.groups = [];
      state.layout = "light";
      state.activeTab = null;
      state.activeChat = null;
      state.allUser = [];
      state.connectedUsers = [];
    },
  },
});

export const {
  loginUser,
  logoutUser,
  userData,
  userList,
  userLayout,
  userActiveTab,
  userActiveChat,
  userAll,
  userConnected,
} = userSlice.actions;

export default userSlice.reducer;
