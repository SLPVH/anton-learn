import {
  requestIsCompleted,
  requestIsSend,
  updateErrorMessage
} from "./actions";

export const requestIsSendOperation = () => dispatch =>
  dispatch(requestIsSend());

export const requestIsCompletedOperation = () => dispatch =>
  dispatch(requestIsCompleted());

export const updateErrorMessageOperation = errorMessage => dispatch =>
  dispatch(updateErrorMessage(errorMessage));
