import {createSelector} from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectUserById = createSelector(
    [selectUser],
    user => user.userById
);

export const selectLoadingUserByEmail = createSelector(
    [selectUser],
    user => user.loadingUserByEmail
);

export const selectLoadingUserById = createSelector(
    [selectUser],
    user => user.loadingUserById
);

export const selectUserByEmailError = createSelector(
    [selectUser],
    user => user.userByEmailError
);

export const selectUserByIdError = createSelector(
    [selectUser],
    user => user.userByIdError
);