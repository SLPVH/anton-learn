import {USER_LOGIN_UPDATED, USER_PASSWORD_UPDATED, USER_SAVE} from "./types";

export function loginUpdated(login) {
    return {
        type: USER_LOGIN_UPDATED,
        payload: login
    };
}

export function passwordUpdated(password) {
    return {
        type: USER_PASSWORD_UPDATED,
        payload: password
    };
}

export function saveUser(login, password) {
    return ({
        type: USER_SAVE,
        meta: {
            async: true,
            url: '/user',
            method: 'POST',
            data: {
                login,
                password
            }
        }
    });
}
