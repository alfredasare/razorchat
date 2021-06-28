import {takeLatest, put, all, call} from 'redux-saga/effects';
import MessageActionTypes from "./message.types";
import axios from "axios";
import {getMessagesFailure, getMessagesSuccess, sendMessageFailure, sendMessageSuccess} from "./message.actions";

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

function* sendMessage({payload}) {
    try {
        const {data} = yield axios.post(baseUrl, {...payload});
        yield put(sendMessageSuccess(data.message));
    } catch (e) {
        yield put(sendMessageFailure(e.message));
    }
}

function* onSendMessageStart() {
    yield takeLatest(MessageActionTypes.SEND_MESSAGE_START, sendMessage);
}

export function* messageSagas() {
    yield all([
        call(onGetMessagesStart),
        call(onSendMessageStart)
    ]);
}