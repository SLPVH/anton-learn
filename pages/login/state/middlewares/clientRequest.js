import axios from "axios";


function handleErrors(err, action, next) {
    console.log('handleErrors');
    next({
        type: `${action.type}_FAILED`,
        payload:
          err &&
          ((err.response && err.response.data && err.response.data.message) ||
            err.message),
        meta: action.meta
    });

    return Promise.reject(err);
}

function handleResponse(res, action, next) {
    console.log('handleResponse');
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
    console.log('clientRequest', action);

    const { url, method = 'GET', data } = action.meta;

    if (!url) {
        throw new Error(`'url' not specified for async action ${action.type}`);
    }

    const axiosConfig = {
        method,
        url,
        data
    };

    return axios(axiosConfig)
        .then(res => handleResponse(res, action, next))
        .catch(err => handleErrors(err, action, next));
};
