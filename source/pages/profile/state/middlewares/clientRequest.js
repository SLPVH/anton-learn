import axios from "axios";

function handleErrors(err, action, next) {
    next({
        type: `${action.type}_FAILED`,
        payload:
            err &&
            ((err.response && err.response.data && err.response.data.message) ||
                err.message),
        meta: action.meta
    });

    return Promise.reject({ err, status: err.response && err.response.status });
}

function handleResponse(res, action, next) {
    if (res.status === 200) {
        next({
            type: `${action.type}_COMPLETED`,
            payload: res.data,
            meta: action.meta
        });

        return res.data;
    }
    const err = res && res.data;
    return handleErrors(err, action, next);
}

export const clientRequest = ({ getState }) => next => action => {
    const result = next(action);
    if (!action.meta || !action.meta.async) {
        return result;
    }

    const { url, method = "GET", data } = action.meta;

    if (!url) {
        throw new Error(`'url' not specified for async action ${action.type}`);
    }

    const axiosConfig = {
        method,
        url,
        data,
        withCredentials: true
    };

    return axios(axiosConfig)
        .then(res => handleResponse(res, action, next))
        .catch(err => handleErrors(err, action, next));
};
