import {createSelector} from "reselect";

const selectConversation = state => state.conversation

export const selectAllConversations = createSelector(
    [selectConversation],
    conversation => conversation.conversations
);

export const selectIsLoadingConversations = createSelector(
    [selectConversation],
    conversation => conversation.isLoadingConversations
);

export const selectConversationsError = createSelector(
    [selectConversation],
    conversation => conversation.conversationsError
);

export const selectChattingWith = createSelector(
    [selectConversation],
    conversation => conversation.chattingWith
);