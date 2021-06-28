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

export const sendMessageStart = payload => ({
    type: MessageActionTypes.SEND_MESSAGE_START,
    payload
});

export const sendMessageSuccess = message => ({
    type: MessageActionTypes.SEND_MESSAGE_SUCCESS,
    payload: message
});

export const sendMessageFailure = error => ({
    type: MessageActionTypes.SEND_MESSAGE_FAILURE,
    payload: error
});