import {createSelector} from "reselect";

const selectConversation = state => state.conversation

export const selectAllConversations = createSelector(
    [selectConversation],
    user => user.conversations
);

export const selectIsLoadingConversations = createSelector(
    [selectConversation],
    user => user.isLoadingConversations
);

export const selectConversationsError = createSelector(
    [selectConversation],
    user => user.conversationsError
);