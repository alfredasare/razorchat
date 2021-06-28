import ConversationActionTypes from "./conversation.types";

export const getConversationsStart = userId => ({
    type: ConversationActionTypes.GET_ALL_CONVERSATIONS_START,
    payload: userId
});

export const getConversationsSuccess = conversations => ({
    type: ConversationActionTypes.GET_ALL_CONVERSATIONS_SUCCESS,
    payload: conversations
});

export const getConversationsFailure = error => ({
    type: ConversationActionTypes.GET_ALL_CONVERSATIONS_FAILURE,
    payload: error
});

export const setChattingWith = user => ({
    type: ConversationActionTypes.SET_CHATTING_WITH,
    payload: user
});