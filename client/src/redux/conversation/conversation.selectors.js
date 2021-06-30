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

export const selectIsCreatingConversation = createSelector(
    [selectConversation],
    conversation => conversation.isCreatingConversation
);

export const selectCreateConversationError = createSelector(
    [selectConversation],
    conversation => conversation.createConversationError
);

export const selectChattingWith = createSelector(
    [selectConversation],
    conversation => conversation.chattingWith
);