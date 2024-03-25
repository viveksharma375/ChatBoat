import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { APIClient } from "../../helpers/apiClient";
import { getFirebaseBackend } from "../../helpers/firebase";

import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD,
} from "./constants";

import {
  loginUserSuccess,
  registerUserSuccess,
  forgetPasswordSuccess,
  apiError,
  logoutUserSuccess,
} from "./actions";

//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

/**
 * Sets the session
 * @param {*} user
 */

const create = new APIClient().create;
const apiClient = new APIClient();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { values, history } }) {
  // try {
  //   const response = yield call(create, username, password);
  //   localStorage.setItem("authUser", JSON.stringify(response));
  //   yield put(loginUserSuccess(response));
  //   history("/dashboard");
  // } catch (error) {
  //   yield put(apiError(error));
  // }
  try {
    // Make the login API call using the create method from APIClient
    console.log("we r in the loginnnn");
    const response = yield call(create, "/v1/user/login", { values });
    console.log("thhis is the res", response);
    console.log("on login api");
    localStorage.setItem("authUser", JSON.stringify(response));
    yield put(loginUserSuccess(response));
    history("/dashboard");
  } catch (error) {
    console.log("on login catch");
    yield put(apiError(error));
  }
  //   try {
  //     console.log("intis login ao");
  //     const response = `http://10.10.2.75:8080/v1/user/login`;
  //     console.log("in responseeeee", response);
  //   } catch (error) {
  //     console.log("on login catch");
  //     yield put(apiError(error));
  //   }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      yield call(fireBaseBackend.logout);
    }
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
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        email,
        password
      );
      yield put(registerUserSuccess(response));
    } else {
      const response = yield call(create, "/register", user);
      yield put(registerUserSuccess(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, email);
      if (response) {
        yield put(
          forgetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        );
      }
    } else {
      const response = yield call(create, "/forget-pwd", { email });
      yield put(forgetPasswordSuccess(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, login);
}

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
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgetPassword),
  ]);
}

export default authSaga;
