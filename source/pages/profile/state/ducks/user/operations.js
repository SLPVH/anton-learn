import {
    addFreePoints,
    lastZeroPointsDateUpdate, loadAllUserInfo,
    makeAnswer,
    slpAddressUpdated,
    totalPointsUpdated,
    updateFreePointsAvailable, updateQuestions, updateWithdrawAvailable,
    withdraw
} from "./actions";
import { requestIsCompletedOperation, requestIsSendOperation, updateErrorMessageOperation } from "../ui";

export const slpAddressUpdateOperation = address => dispatch =>
    dispatch(slpAddressUpdated(address));

export const totalPointsUpdateOperation = points => dispatch => {
    dispatch(totalPointsUpdated(points));
    if (points === 0) {
        dispatch(updateFreePointsAvailable(true));
        setTimeout(() => dispatch(updateFreePointsAvailable(true)), 1000 * 60);
        dispatch(lastZeroPointsDateUpdateOperation(new Date()));
    }
};

export const updateFreePointsAvailableOperation = isAvailable => dispatch =>
    dispatch(updateFreePointsAvailable(isAvailable));

export const updateWithdrawAvailableOperation = isAvailable => dispatch =>
    dispatch(updateWithdrawAvailable(isAvailable));

export const lastZeroPointsDateUpdateOperation = date => dispatch =>
    dispatch(lastZeroPointsDateUpdate(date));

export const withdrawOperation = () => (dispatch, getState) => {
    dispatch(requestIsSendOperation());
    const { user } = getState();
    dispatch(withdraw(user.slp_address))
        .then(() => {
            dispatch(totalPointsUpdated(0));
        })
        .catch(() => {
            dispatch(updateErrorMessageOperation('Some error with withdraw'))
        })
        .then(() => {
            dispatch(requestIsCompletedOperation());
        });
};

export const addFreePointsOperation = () => dispatch => {
    dispatch(requestIsSendOperation());
    dispatch(addFreePoints())
        .then(({ points }) => {
            dispatch(totalPointsUpdated(points));
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            dispatch(requestIsCompletedOperation());
        });
};

export const makeAnswerOperation = (questionId, answerId) => dispatch => {
    dispatch(requestIsSendOperation());
    dispatch(makeAnswer(questionId, answerId))
        .then(({ points }) => {
            dispatch(totalPointsUpdated(points));
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            dispatch(requestIsCompletedOperation());
        });
};

export const updateQuestionsOperation = questions => dispatch =>
    dispatch(updateQuestions(questions));

export const loadAllUserInfoOperation = () => dispatch => {
    dispatch(requestIsSendOperation());
    dispatch(loadAllUserInfo())
        .then(data => {
            dispatch(totalPointsUpdated(data.points));
            dispatch(updateQuestionsOperation(data.questions));
            dispatch(updateWithdrawAvailable(data.isWithdrawAvailable));
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            dispatch(requestIsCompletedOperation());
        });
};
