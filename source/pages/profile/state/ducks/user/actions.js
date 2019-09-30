import {
    ADD_FREE_POINTS, LOAD_ALL,
    MAKE_ANSWER,
    UPDATE_FREE_POINTS_AVAILABLE, UPDATE_QUESTIONS, UPDATE_WITHDRAWS_AVAILABLE,
    USER_LAST_ZERO_POINTS_DATE_UPDATED,
    USER_SLP_ADDRESS_UPDATED,
    USER_TOTAL_POINTS_UPDATED,
    WITHDRAW
} from "./types";

export function slpAddressUpdated(address) {
    return {
        type: USER_SLP_ADDRESS_UPDATED,
        payload: address
    };
}

export function totalPointsUpdated(points) {
    return {
        type: USER_TOTAL_POINTS_UPDATED,
        payload: points
    };
}

export function lastZeroPointsDateUpdate(date) {
    return {
        type: USER_LAST_ZERO_POINTS_DATE_UPDATED,
        payload: date
    };
}

export function updateFreePointsAvailable(isAvailable) {
    return {
        type: UPDATE_FREE_POINTS_AVAILABLE,
        payload: isAvailable
    };
}

export function updateWithdrawAvailable(isAvailable) {
    return {
        type: UPDATE_WITHDRAWS_AVAILABLE,
        payload: isAvailable
    };
}

export function updateQuestions(questions) {
    return {
        type: UPDATE_QUESTIONS,
        payload: questions
    };
}

export function withdraw(slpAddress) {
    return {
        type: WITHDRAW,
        meta: {
            async: true,
            url: "/withdraw",
            method: "POST",
            data: {
                slpAddress
            }
        }
    };
}

export function addFreePoints() {
    return {
        type: ADD_FREE_POINTS,
        meta: {
            async: true,
            url: "/free-points",
            method: "POST"
        }
    };
}

export function makeAnswer(questionId, answerId) {
    return {
        type: MAKE_ANSWER,
        meta: {
            async: true,
            url: "/answer",
            method: "POST",
            data: {
                questionId,
                answerId
            }
        }
    };
}

export function loadAllUserInfo() {
    return {
        type: LOAD_ALL,
        meta: {
            async: true,
            url: "/load-all",
            method: "GET"
        }
    };
}
