import { USER_LOGIN_UPDATED, USER_PASSWORD_UPDATED } from "./types";

const initialState = {
  login: "",
  password: ""
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_UPDATED:
      return { ...state, login: action.payload };
    case USER_PASSWORD_UPDATED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}
