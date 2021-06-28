import {all, call} from 'redux-saga/effects';
import {userSagas} from './user/user.sagas';
import {conversationSagas} from "./conversation/conversation.sagas";
import {messageSagas} from "./message/message.sagas";

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(conversationSagas),
        call(messageSagas)
    ]);
}