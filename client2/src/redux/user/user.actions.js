import UserActionTypes from "./user.types";

//  Sign Up
export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = user => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

//  Continue With Google
export const signInWithGoogleStart = () => ({
    type: UserActionTypes.CONTINUE_WITH_GOOGLE_START
});

export const signInWithGoogleSuccess = user => ({
    type: UserActionTypes.CONTINUE_WITH_GOOGLE_SUCCESS,
    payload: user
});

export const signInWithGoogleFailure = error => ({
    type: UserActionTypes.CONTINUE_WITH_GOOGLE_FAILURE,
    payload: error
});

//  Sign In
export const signInStart = userCredentials => ({
    type: UserActionTypes.SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

//  Sign Out
export const signOutStart = () => ({
    type: UserActionTypes.LOGOUT_START,
});

export const signOutSuccess = () => ({
    type: UserActionTypes.LOGOUT_SUCCESS,
});

export const signOutFailure = error => ({
    type: UserActionTypes.LOGOUT_FAILURE,
    payload: error,
});

//  Check Session
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION_START
});

export const checkSessionSuccess = isLoggedIn => ({
    type: UserActionTypes.CHECK_USER_SESSION_SUCCESS,
    payload: isLoggedIn
});

export const checkSessionFailure = error => ({
    type: UserActionTypes.CHECK_USER_SESSION_FAILURE,
    payload: error
});

//  Clear
export const clearAuthStatus = () => ({
    type: UserActionTypes.CLEAR_AUTH_PROGRESS_STATUS
});