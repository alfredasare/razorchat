import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import axios from "axios";
import {
    signInFailure,
    signInSuccess,
    signInWithGoogleFailure,
    signInWithGoogleSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
    checkSessionSuccess,
    checkSessionFailure
} from "./user.actions";

const baseUrl = 'http://localhost:8000/v1/auth';

//  Sign Up
function* signUp({payload}) {
    try {
        yield axios.post(`${baseUrl}/email/signup`, {...payload});
        yield put(signUpSuccess(payload));
    } catch (e) {
        yield put(signUpFailure(e.response.data));
    }
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* signInHelper(payload) {
    const signInUser = yield axios.post(`${baseUrl}/email/login`, {
        email: payload.email,
        password: payload.password
    }, {withCredentials: true});

    if (signInUser.status === 200) {
        yield put(signInSuccess(signInUser.data.user));
    }
}

//  Sign In After Sign Up
function* signInAfterSignUp({payload}) {
    try {
        yield signInHelper(payload);
    } catch (e) {
        yield put(signInFailure(e.response.data));
    }
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//  Sign In
function* signIn({payload}) {
    try {
        yield signInHelper(payload);
    } catch (e) {
        yield put(signInFailure(`${e.response.data}. Please make sure email and password are correct`));
    }
}

function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

//  Sign In With Google
function* continueWithGoogle() {
    try {
        const {data} = yield axios.get(`${baseUrl}/google`, {withCredentials: true});
        yield put(signInWithGoogleSuccess(data.user))
    } catch (e) {
        yield put(signInWithGoogleFailure(e.message));
    }
}

function* onContinueWithGoogleStart() {
    yield takeLatest(UserActionTypes.CONTINUE_WITH_GOOGLE_START, continueWithGoogle);
}

//  Sign Out
function* signOut() {
    try {
        yield axios.get(`${baseUrl}/logout`, {withCredentials: true});
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailure(e.message));
    }
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.LOGOUT_START, signOut);
}

const getCookie = () => {
    const cookies = document.cookie.split(";");
    for (const item of cookies) {
        if (item.startsWith("session=")){
            return item.substr(8);
        }
    }
}

//  Check Session
function* checkSession() {
    try {
        const hasCookieExpired = !getCookie();

        if (!hasCookieExpired) {
            yield put(checkSessionSuccess(true));
        } else {
            yield put(checkSessionSuccess(false));
        }
    } catch (e) {
        yield put(checkSessionFailure(e.message));
    }
}

function* onCheckSessionStart() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, checkSession);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignInStart),
        call(onContinueWithGoogleStart),
        call(onSignOutStart),
        call(onCheckSessionStart)
    ]);
}