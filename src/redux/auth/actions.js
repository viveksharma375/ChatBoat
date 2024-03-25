import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  API_FAILED,
} from "./constants";

// export const loginUser = (values, history) => ({
//   type: LOGIN_USER,
//   payload: { values, history },
// });
export const loginUser = (values, history) => {
  console.log("loginUser action creator called with values:", values);
  return {
    type: LOGIN_USER,
    payload: { values, history },
  };
};

// export const loginUserSuccess = (user) => ({
//   type: LOGIN_USER_SUCCESS,
//   payload: user,
// });
export const loginUserSuccess = (user) => {
  console.log("loginUserSuccess action creator called with user:", user);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: { user },
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const forgetPassword = (email) => ({
  type: FORGET_PASSWORD,
  payload: { email },
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: passwordResetStatus,
});

export const apiError = (error) => ({
  type: API_FAILED,
  payload: error,
});
