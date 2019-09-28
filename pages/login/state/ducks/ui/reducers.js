import {
    ERROR_MESSAGE_UPDATED,
    REQUEST_COMPLETED,
    REQUEST_IS_SEND
} from "./types";

const initialState = {
    sending: false,
    error: false
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case REQUEST_IS_SEND:
            return { ...state, sending: true };
        case REQUEST_COMPLETED:
            return { ...state, sending: false };
        case ERROR_MESSAGE_UPDATED:
            return { ...state, error: action.payload || false };
        default:
            return state;
    }
}
