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