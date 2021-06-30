import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import axios from "axios";
import {
    getAllUsersFailure, getAllUsersSuccess,
    getUserByEmailFailure,
    getUserByEmailSuccess,
    getUserByIdFailure,
    getUserByIdSuccess
} from "./user.actions";


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
        const {data} = yield axios.get(`${baseUrl}/${payload}`);
        yield put(getUserByIdSuccess(data.user));
    } catch (e) {
        yield put(getUserByIdFailure(e.response.data));
    }
}

function* onGetUserById() {
    yield takeEvery(UserActionTypes.GET_USER_BY_ID_START, getUserById);
}

function getOtherUsers(userId, allUsers, conversations) {
    const all = [];

    conversations.forEach(conversation => {
        all.push(...conversation.members.filter(id => id !== userId));
    });

    return allUsers.filter(user => !all.includes(user.id));
}

//  Get All Users
function* getAllUsers({payload}) {
    try {
        const {data} = yield axios.get(`${baseUrl}/all`);
        const allUsers = data.users.filter(user => user.id !== payload.userId);
        const otherUsers = getOtherUsers(payload.userId, allUsers, payload.conversations);
        yield put(getAllUsersSuccess(otherUsers));
    } catch (e) {
        yield put(getAllUsersFailure(e.message));
    }
}

function* onGetAllUsersStart() {
    yield takeLatest(UserActionTypes.GET_ALL_USERS_START, getAllUsers);
}

export function* userSagas() {
    yield all([
        call(onGetUserByEmail),
        call(onGetUserById),
        call(onGetAllUsersStart)
    ]);
}