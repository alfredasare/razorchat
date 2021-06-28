import MessageActionTypes from "./message.types";

export const getMessagesStart = conversationId => ({
    type: MessageActionTypes.GET_MESSAGES_START,
    payload: conversationId
});

export const getMessagesSuccess = messages => ({
    type: MessageActionTypes.GET_MESSAGES_SUCCESS,
    payload: messages
});

export const getMessagesFailure = error => ({
    type: MessageActionTypes.GET_MESSAGES_FAILURE,
    payload: error
});