import {takeLatest, put, all, call} from 'redux-saga/effects';
import ConversationActionTypes from "./conversation.types";
import axios from "axios";
import {
    createConversationFailure,
    createConversationSuccess,
    getConversationsFailure,
    getConversationsSuccess, setChattingWith
} from "./conversation.actions";
import {getMessagesStart} from "../message/message.actions";
import {updateConversationUsers} from "../user/user.actions";


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

function* createConversation({payload}) {
    try {
        const {data} = yield axios.post(baseUrl, {
            senderId: payload.senderId,
            receiverId: payload.receiverId
        });
        const conversationId = data.conversation._id;
        yield put(createConversationSuccess(data.conversation));
        yield put(updateConversationUsers(payload.user.id));
        yield put(setChattingWith({...payload.user, conversationId}));
        yield put(getMessagesStart(conversationId));
    } catch (e) {
        yield put(createConversationFailure(e.message));
    }
}

function* onCreateConversationStart() {
    yield takeLatest(ConversationActionTypes.CREATE_CONVERSATION_START, createConversation);
}

export function* conversationSagas() {
    yield all([
        call(onGetConversationsStart),
        call(onCreateConversationStart)
    ]);
}