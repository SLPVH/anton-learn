import {
  ERROR_MESSAGE_UPDATED,
  REQUEST_COMPLETED,
  REQUEST_IS_SEND,
} from "./types";

export function requestIsSend() {
  return {
    type: REQUEST_IS_SEND
  };
}

export function requestIsCompleted() {
  return {
    type: REQUEST_COMPLETED
  };
}

export function updateErrorMessage(msg) {
  return {
    type: ERROR_MESSAGE_UPDATED,
    payload: msg
  };
}
