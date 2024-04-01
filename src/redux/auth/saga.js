import { all, call, fork, put, takeEvery } from "redux-saga/effects";


import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD,
  USER_TOKEN,
} from "./constants";

import {
  loginUserSuccess,
  registerUserSuccess,
  forgetPasswordSuccess,
  apiError,
  logoutUserSuccess,
  userToken,
} from "./actions";
import API from "../../helpers/api";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

const apiInstance = new API();
//Initilize firebase

/**
 * Sets the session
 * @param {*} user
 */


/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password, history } }) {
  console.log("tetindorgsogosoivoivihrsf")
  let data = {
    phoneNumberOrEmail: username,
    password: password,
  };

  try {
    const isLogin = yield apiInstance.post("/user/login", data);
    if (isLogin.status) {
      yield put(userToken(isLogin.message.token))
      localStorage.setItem("api-access-token", isLogin.message.token);
      
      const response = yield apiInstance.getWithToken(
        "/user/email",
        isLogin.message.token
        );
        if (response.status) {
          const profileData = response.message.data;
          yield put(loginUserSuccess(response.message.data));

        localStorage.setItem("authUser", JSON.stringify(profileData));
      }

      history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }


}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
   
    yield put(logoutUserSuccess(true));
  } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
  try {
    const email = user.email;
    const password = user.password;
    
    
  } catch (error) {
    yield put(apiError(error));
  }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
  try {
   
    
  } catch (error) {
    yield put(apiError(error));
  }
}

// export function* watchLoginUser() {
//   yield takeEvery(LOGIN_USER, login);
// }


export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
  yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
  yield all([
    // fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgetPassword),
  ]);
}

export default authSaga;
