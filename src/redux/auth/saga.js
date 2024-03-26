import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getFirebaseBackend } from "../../helpers/firebase";


import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
    logoutUserSuccess
} from './actions';
import axios from 'axios';
import API from '../../helpers/api';
import { socket } from '../../helpers/socket';

const apiInstance = new API();
//Initilize firebase
const fireBaseBackend = getFirebaseBackend();


/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, history } }) {
    let data = {
        phoneNumberOrEmail: username,
        password: password
    }
    let bodyValue = JSON.stringify(data);
 
    try {
        console.log("data", data)
        let response = yield fetch("http://10.10.1.75:3004/v1/user/login", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(data)
        })
        // console.log("response is", response)
        let responsedata = yield response.json()
        console.log("respnse", responsedata)
        if(responsedata.status===200){
            console.log("this pryti")
        yield put(loginUserSuccess(responsedata.data.result.token));
        localStorage.setItem("api-access-token",responsedata.data.result.token)
        
        const response = yield apiInstance.getWithToken("/user/email", responsedata.data.result.token)
        if (response.status) {
            
            console.log("dfnosifjvsprjgvsr",response.message.data)
            
            const profileData = response.message.data;
            console.log("profile dats ",profileData)
        
            localStorage.setItem("authUser",JSON.stringify(profileData))
        }



        history('/dashboard');
        }
    } catch (error) {
        yield put(apiError(error));
        console.log("error in ", error)
    }

    // try{

    //     console.log("we are in Login APi")

    //     const response = yield call(create,"v1/user/login",bodyValue);
    //     yield put(loginUserSuccess(response));
    //     let responsedata= yield response.json()
    //     console.log("This is response in login ", response)
    //     localStorage.setItem("api-access-token",responsedata.data.result.token)
    //     localStorage.setItem("authUser",JSON.stringify({username,password}))

    // }
    // catch(error){
    //     yield put(apiError(error));
    //     console.log("Error in Login API",error)
    // }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            yield call(fireBaseBackend.logout);
        }
        yield put(logoutUserSuccess(true));
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
    try {
        const email = user.email;
        const password = user.password;
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.registerUser, email, password);
            yield put(registerUserSuccess(response));
        } else {
            const response = yield call(create, '/register', user);
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
            const response = yield call(create, '/forget-pwd', { email });
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