import UserActionTypes from "./user.types";

//  Get User By Email
export const getUserByEmailStart = email => ({
    type: UserActionTypes.GET_USER_BY_EMAIL_START,
    payload: email
});

export const getUserByEmailSuccess = user => ({
    type: UserActionTypes.GET_USER_BY_EMAIL_SUCCESS,
    payload: user
});

export const getUserByEmailFailure = error => ({
    type: UserActionTypes.GET_USER_BY_EMAIL_FAILURE,
    payload: error
});

//  Get User By Id
export const getUserByIdStart = id => ({
    type: UserActionTypes.GET_USER_BY_ID_START,
    payload: id
});

export const getUserByIdSuccess = user => ({
    type: UserActionTypes.GET_USER_BY_ID_SUCCESS,
    payload: user
});

export const getUserByIdFailure = error => ({
    type: UserActionTypes.GET_USER_BY_ID_FAILURE,
    payload: error
});

//  Get all users
export const getAllUsersStart = payload => ({
    type: UserActionTypes.GET_ALL_USERS_START,
    payload
});

export const getAllUsersSuccess = users => ({
    type: UserActionTypes.GET_ALL_USERS_SUCCESS,
    payload: users
});

export const getAllUsersFailure = error => ({
    type: UserActionTypes.GET_ALL_USERS_FAILURE,
    payload: error
});

export const updateConversationUsers = id => ({
    type: UserActionTypes.UPDATE_CONVERSATION_USERS,
    payload: id
});