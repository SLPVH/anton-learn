import { loginUpdated, passwordUpdated, saveUser } from "./actions";
import {
    requestIsCompletedOperation,
    requestIsSendOperation,
    updateErrorMessageOperation
} from "../ui";

export const updateLoginOperation = login => dispatch =>
    dispatch(loginUpdated(login));

export const updatePasswordOperation = password => dispatch => {
    dispatch(passwordUpdated(password));
};

export const saveUserOperation = () => (dispatch, getState) => {
    const {
        user: { login, password }
    } = getState();

    dispatch(requestIsSendOperation());

    if (!login || !login.length || !password || !password.length) {
        dispatch(
            updateErrorMessageOperation("Login or password can't be blank")
        );
    }

    dispatch(saveUser(login, password))
        .then(() => {
            dispatch(requestIsCompletedOperation());
            // save token and redirecting
        })
        .catch(() => {
            dispatch(requestIsCompletedOperation());
            dispatch(updateErrorMessageOperation("Login already exists"));
        });
};
