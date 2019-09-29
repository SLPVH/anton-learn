import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import { user, ui } from "./ducks";
import {clientRequest} from "./middlewares/clientRequest";

export function configureStore(initialState = {}) {
    const reducer = combineReducers({
        user,
        ui
    });
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(clientRequest, thunk)));
}
