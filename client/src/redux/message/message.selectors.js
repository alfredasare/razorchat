import {createSelector} from "reselect";

const selectMessages = state => state.messages;

export const selectAllMessages = createSelector(
    [selectMessages],
    messages => messages.messages
);

export const selectIsLoadingMessages = createSelector(
    [selectMessages],
    messages => messages.isLoadingMessages
);

export const selectMessagesError = createSelector(
    [selectMessages],
    messages => messages.messagesError
);