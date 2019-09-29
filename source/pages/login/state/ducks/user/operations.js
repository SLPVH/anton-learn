import { Cookies } from 'react-cookie';
const cookies = new Cookies();

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
        .then((user) => {
            dispatch(requestIsCompletedOperation());
            // save token and redirecting
            cookies.set('jwtToken', user.token);
            window.location.href = '/profile';
        })
        .catch(({ status }) => {
            dispatch(requestIsCompletedOperation());
            dispatch(updateErrorMessageOperation("Login already exists or invalid password"));
        });
};
