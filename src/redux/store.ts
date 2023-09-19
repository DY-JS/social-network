
import {combineReducers, createStore} from "redux";
import profileReducer from './profile/profileReducer'
import dialogsReducer from "./dialogs/dialogsReducer";
import sidebarReducer from "./sidebar/sidebarReducer";
import usersReducer from "./users/usersReducer";

let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    users: usersReducer
})

let store = createStore(rootReducer);

// @ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof store.getState>;
//тип состояния; он будет знать о типах и состоянии всех редьюсеров

export type AppDispatch = typeof store.dispatch;

export default store;

