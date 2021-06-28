import {takeLatest, put, all, call} from 'redux-saga/effects';
import MessageActionTypes from "./message.types";
import axios from "axios";
import {getMessagesFailure, getMessagesSuccess} from "./message.actions";

const baseUrl = 'http://localhost:8000/v1/messages';

function* getAllMessages({payload}) {
    try {
        const {data} = yield axios(`${baseUrl}/${payload}`);
        yield put(getMessagesSuccess(data.messages));
    } catch (e) {
        yield put(getMessagesFailure(e.message));
    }
}

function* onGetMessagesStart() {
    yield takeLatest(MessageActionTypes.GET_MESSAGES_START, getAllMessages);
}

export function* messageSagas() {
    yield all([
        call(onGetMessagesStart)
    ]);
}