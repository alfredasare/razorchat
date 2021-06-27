import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import axios from "axios";
import {getUserByEmailFailure, getUserByEmailSuccess, getUserByIdFailure, getUserByIdSuccess} from "./user.actions";


const baseUrl = 'http://localhost:8000/v1/users';

//  Get user by email
function* getUserByEmail({payload}) {
    try {
        const {data} = yield axios.post(`${baseUrl}/email`, {email: payload});
        yield put(getUserByEmailSuccess(data.user));
    } catch (e) {
        yield put(getUserByEmailFailure(e.response.data));
    }
}

function* onGetUserByEmail() {
    yield takeLatest(UserActionTypes.GET_USER_BY_EMAIL_START, getUserByEmail);
}

//  Set user by id
function* getUserById({payload}) {
    try {
        const user = yield axios.get(`${baseUrl}/${payload}`);
        yield put(getUserByIdSuccess(user.data));
    } catch (e) {
        yield put(getUserByIdFailure(e.response.data));
    }
}

function* onGetUserById() {
    yield takeLatest(UserActionTypes.GET_USER_BY_ID_START, getUserById);
}


export function* userSagas() {
    yield all([
        call(onGetUserByEmail),
        call(onGetUserById)
    ]);
}