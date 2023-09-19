import {IProfilePage, IPost, IUser} from "../../components/types";
import {v4} from 'uuid'


//actions
export enum UserActions {
    SET_USERS ='SET-USERS',
    ADD_USER ='ADD-USER',
    UPDATE_USER = 'UPDATE_USER',
    FOLLOW_USER = "FOLLOW_USER",
    UNFOLLOW_USER = "UNFOLLOW_USER",
}

//actions-creators
export const setUsersAC = (users: IUser[]) => ({
    type: UserActions.SET_USERS,
    users
} as const)

export const addUserAC = (user: IUser) => ({
    type: UserActions.ADD_USER,
    user
} as const)

export const followUserAC = (userId: number) => ({
    type: UserActions.FOLLOW_USER,
    userId
} as const)

export const unFollowUserAC = (userId: number) => ({
    type: UserActions.UNFOLLOW_USER,
    userId
} as const)


// types
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type AddUserACType = ReturnType<typeof addUserAC>
export type FollowUserACType = ReturnType<typeof followUserAC>
export type UnFollowUserACType = ReturnType<typeof unFollowUserAC>

//union type
export type UnionUserType = AddUserACType | FollowUserACType | UnFollowUserACType | SetUsersACType

const initialState: UserStateType = {
    users: []
    //     {id: v4(), photoURL: '', followed: false, fullName: 'Dmitry', status: 'Boss', location: {city: 'LA', country: 'USA'} },
    //     {id: v4(), photoURL: '', followed: false, fullName: 'Misha', status: 'Boss', location: {city: 'Kiev', country: 'Ukraine'} },
    //     {id: v4(), photoURL: '', followed: false, fullName: 'Vasil', status: 'Boss', location: {city: 'Gdansk', country: 'Poland'} },

}

export type UserStateType = {
    users: IUser[]
}

const usersReducer = (state: UserStateType =initialState, action: UnionUserType): UserStateType => {
    switch (action.type) {
        case UserActions.SET_USERS: return {...state, users: action.users};
        case UserActions.ADD_USER:
            return {...state, users: [...state.users, action.user]};
        case UserActions.FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : {...u})
            };
        case UserActions.UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : {...u})
            };

        default: return state;
    }
};

export default usersReducer