import UserActionTypes from "./user.types";

const INITIAL_VALUE = {
    currentUser: null,
    userById: null,
    loadingUserByEmail: false,
    loadingUserById: false,
    userByEmailError: '',
    userByIdError: '',
    allUsers: null,
    isLoadingAllUsers: false,
    allUsersError: ''
};

const userReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case UserActionTypes.GET_USER_BY_EMAIL_START:
            return {
                ...state,
                loadingUserByEmail: true,
                userByEmailError: ''
            };

        case UserActionTypes.GET_USER_BY_EMAIL_SUCCESS:
            return {
                ...state,
                loadingUserByEmail: false,
                userByEmailError: '',
                currentUser: action.payload
            };

        case UserActionTypes.GET_USER_BY_EMAIL_FAILURE:
            return {
                ...state,
                loadingUserByEmail: false,
                userByEmailError: action.payload
            };

        case UserActionTypes.GET_USER_BY_ID_START:
            return {
                ...state,
                loadingUserById: true,
                userByIdError: ''
            };

        case UserActionTypes.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loadingUserById: false,
                userByIdError: '',
                userById: action.payload
            };

        case UserActionTypes.GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                loadingUserById: false,
                userByIdError: action.payload
            };

        case UserActionTypes.GET_ALL_USERS_START:
            return {
                ...state,
                allUsersError: '',
                isLoadingAllUsers: true
            };

        case UserActionTypes.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoadingAllUsers: false,
                allUsersError: '',
                allUsers: action.payload
            };

        case UserActionTypes.GET_ALL_USERS_FAILURE:
            return {
                ...state,
                allUsersError: action.payload,
                isLoadingAllUsers: false
            };

        default:
            return state;
    }
};

export default userReducer;