import {createSelector} from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectIsLoadingEmail = createSelector(
    [selectUser],
    user => user.isLoadingEmail
);

export const selectIsLoadingGoogle = createSelector(
    [selectUser],
    user => user.isLoadingGoogle
);

export const selectSignUpSuccess = createSelector(
    [selectUser],
    user => user.signUpSuccess
);

export const selectSignInSuccess = createSelector(
    [selectUser],
    user => user.signInSuccess
);

export const selectGoogleSignInSuccess = createSelector(
    [selectUser],
    user => user.googleSignInSuccess
);

export const selectEmailError = createSelector(
    [selectUser],
    user => user.error
);

export const selectGoogleSignInError = createSelector(
    [selectUser],
    user => user.googleSignInError
);