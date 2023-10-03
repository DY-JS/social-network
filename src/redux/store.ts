
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import profileReducer from './profile/profileReducer'
import dialogsReducer from "./dialogs/dialogsReducer";
import sidebarReducer from "./sidebar/sidebarReducer";
import usersReducer from "./users/usersReducer";
import authReducer from "./auth/authReducer";

let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    auth: authReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof store.getState>;
//тип состояния; он будет знать о типах и состоянии всех редьюсеров

export type AppDispatch = typeof store.dispatch;

export default store;

