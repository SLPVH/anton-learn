import {
    UPDATE_FREE_POINTS_AVAILABLE, UPDATE_WITHDRAWS_AVAILABLE,
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
    questions: [
        {
            id: 1,
            status: 0,
            title: 'Question Title',
            content: 'Question content',
            answers: [
                {
                    id: 1,
                    text: 'Answer text'
                },
                {
                    id: 2,
                    text: 'Answer text'
                },
                {
                    id: 3,
                    text: 'Answer text'
                }
            ]
        },
        {
            id: 2,
            status: 0,
            title: 'Question Title',
            content: 'Question content',
            answers: [
                {
                    id: 4,
                    text: 'Answer text'
                },
                {
                    id: 5,
                    text: 'Answer text'
                },
                {
                    id: 6,
                    text: 'Answer text'
                }
            ]
        },
        {
            id: 3,
            status: 0,
            title: 'Question Title',
            content: 'Question content',
            answers: [
                {
                    id: 7,
                    text: 'Answer text'
                },
                {
                    id: 8,
                    text: 'Answer text'
                },
                {
                    id: 9,
                    text: 'Answer text'
                }
            ]
        },
        {
            id: 4,
            status: 0,
            title: 'Question Title',
            content: 'Question content',
            answers: [
                {
                    id: 10,
                    text: 'Answer text'
                },
                {
                    id: 11,
                    text: 'Answer text'
                },
                {
                    id: 12,
                    text: 'Answer text'
                }
            ]
        },
        {
            id: 5,
            status: 0,
            title: 'Question Title',
            content: 'Question content',
            answers: [
                {
                    id: 13,
                    text: 'Answer text'
                },
                {
                    id: 14,
                    text: 'Answer text'
                },
                {
                    id: 15,
                    text: 'Answer text'
                }
            ]
        }
    ]
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
        default:
            return state;
    }
}
