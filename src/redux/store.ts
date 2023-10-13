
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import profileReducer from './profile/profileReducer'
import dialogsReducer from "./dialogs/dialogsReducer";
import sidebarReducer from "./sidebar/sidebarReducer";
import usersReducer from "./users/usersReducer";
import authReducer from "./auth/authReducer";
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store

type rootReducerType = typeof rootReducer

//export type AppStateType = ReturnType<rootReducerType>
export type AppStateType = ReturnType<typeof store.getState>;
//тип состояния; он будет знать о типах и состоянии всех редьюсеров

export type AppDispatch = typeof store.dispatch;

export default store;

