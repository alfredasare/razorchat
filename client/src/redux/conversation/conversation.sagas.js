import {takeLatest, put, all, call} from 'redux-saga/effects';
import ConversationActionTypes from "./conversation.types";
import axios from "axios";
import {getConversationsFailure, getConversationsSuccess} from "./conversation.actions";


const baseUrl = 'http://localhost:8000/v1/conversations';

function* getConversations({payload}) {
    try {
        const {data} = yield axios.get(`${baseUrl}/${payload}`);
        yield put(getConversationsSuccess(data.conversation));
    } catch (e) {
        yield put(getConversationsFailure(e.message));
    }
}

function* onGetConversationsStart() {
    yield takeLatest(ConversationActionTypes.GET_ALL_CONVERSATIONS_START, getConversations);
}

export function* conversationSagas() {
    yield all([
        call(onGetConversationsStart)
    ]);
}