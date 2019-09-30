import {
    UPDATE_FREE_POINTS_AVAILABLE, UPDATE_QUESTIONS, UPDATE_WITHDRAWS_AVAILABLE,
    USER_LAST_ZERO_POINTS_DATE_UPDATED,
    USER_SLP_ADDRESS_UPDATED,
    USER_TOTAL_POINTS_UPDATED
} from "./types";

const initialState = {
    slp_address: "",
    total_points: 0,
    last_zero_points_date: null,
    is_free_points_available: false,
    is_withdraw_available: false,
    questions: []
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_SLP_ADDRESS_UPDATED:
            return { ...state, slp_address: action.payload };
        case USER_TOTAL_POINTS_UPDATED:
            return { ...state, total_points: action.payload };
        case USER_LAST_ZERO_POINTS_DATE_UPDATED:
            return { ...state, last_zero_points_date: action.payload };
        case UPDATE_FREE_POINTS_AVAILABLE:
            return { ...state, is_free_points_available: action.payload };
        case UPDATE_WITHDRAWS_AVAILABLE:
            return { ...state, is_withdraw_available: action.payload };
        case UPDATE_QUESTIONS:
            return { ...state, questions: action.payload };
        default:
            return state;
    }
}
