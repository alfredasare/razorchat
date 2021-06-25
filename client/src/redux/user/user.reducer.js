import UserActionTypes from "./user.types";

const INITIAL_VALUE = {
    currentUser: null,
    error: '',
    signUpSuccess: '',
    signInSuccess: '',
    googleSignInSuccess: '',
    googleSignInError: '',
    isLoadingEmail: false,
    isLoadingGoogle: false,
    checkingSession: false
};

const userReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoadingEmail: true,
                error: '',
                signUpSuccess: ''
            };

        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoadingEmail: false,
                error: '',
                signUpSuccess: 'Signed up'
            };

        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoadingEmail: false,
                error: action.payload,
                signUpSuccess: ''
            };

        case UserActionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoadingEmail: true,
                signInSuccess: '',
                error: ''
            };

        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: '',
                isLoadingEmail: false,
                signInSuccess: 'Sign in successful'
            };

        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoadingEmail: false,
            };

        case UserActionTypes.CONTINUE_WITH_GOOGLE_START:
            return {
                ...state,
                isLoadingGoogle: true,
                googleSignInSuccess: '',
                googleSignInError: ''
            };

        case UserActionTypes.CONTINUE_WITH_GOOGLE_SUCCESS:
            return {
                ...state,
                isLoadingGoogle: false,
                googleSignInSuccess: 'Google sign in successful',
                currentUser: action.payload,
                googleSignInError: ''
            };

        case UserActionTypes.CONTINUE_WITH_GOOGLE_FAILURE:
            return {
                ...state,
                isLoadingGoogle: false,
                googleSignInSuccess: '',
                googleSignInError: action.payload,
            };

        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
            };

        case UserActionTypes.CHECK_USER_SESSION_START:
            return {
                ...state,
                checkingSession: true
            };

        case UserActionTypes.CHECK_USER_SESSION_SUCCESS:
            return {
                ...state,
                currentUser: action.payload ? state.currentUser : null,
                checkingSession: false
            };

        case UserActionTypes.CHECK_USER_SESSION_FAILURE:
            return {
                ...state,
                checkingSession: false,
                currentUser: null
            };

        case UserActionTypes.CLEAR_AUTH_PROGRESS_STATUS:
            return {
                ...state,
                error: '',
                signUpSuccess: '',
                signInSuccess: '',
                googleSignInSuccess: '',
                googleSignInError: ''
            };

        default:
            return state;
    }
};

export default userReducer;