import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import authReducer from "./authReduser";


let reducers = combineReducers({
    authData: authReducer,
    form: formReducer
})
export let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
window.store = store