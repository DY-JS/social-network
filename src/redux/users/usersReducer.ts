import {IProfilePage, IPost, IUser} from "../../components/types";


//actions
export enum UserActions {
    SET_USERS = 'SET-USERS',
    ADD_USER = 'ADD-USER',
    UPDATE_USER = 'UPDATE_USER',
    FOLLOW_USER = "FOLLOW_USER",
    UNFOLLOW_USER = "UNFOLLOW_USER",
    TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT",
    SET_IS_LOADING="SET_IS_LOADING",
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

export const setCurrentPageAC = (currentPage: number) => ({
    type: UserActions.SET_CURRENT_PAGE,
    currentPage
} as const)

export const setTotalUsersCountAC = (usersCount: number) => ({
    type: UserActions.SET_TOTAL_USERS_COUNT,
    usersCount
} as const)

export const setIsLoadingAC = (isLoading: boolean) => ({
    type: UserActions.SET_IS_LOADING,
    isLoading
} as const)

export const toggleFollowingProgressAC = (isLoading: boolean, userId: number) => ({
    type: UserActions.TOGGLE_FOLLOWING_PROGRESS,
    isLoading,
    userId
} as const)


// types
export type SetIsLoadingACType = ReturnType<typeof setIsLoadingAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type AddUserACType = ReturnType<typeof addUserAC>
export type FollowUserACType = ReturnType<typeof followUserAC>
export type UnFollowUserACType = ReturnType<typeof unFollowUserAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type ToggleFollowingProgressACType = ReturnType<typeof toggleFollowingProgressAC>

//union type
export type UnionUserType = AddUserACType
    | FollowUserACType
    | UnFollowUserACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
|SetIsLoadingACType
|ToggleFollowingProgressACType

const initialState: UserStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []

    //     {id: v4(), photoURL: '', followed: false, fullName: 'Dmitry', status: 'Boss', location: {city: 'LA', country: 'USA'} },
    //     {id: v4(), photoURL: '', followed: false, fullName: 'Misha', status: 'Boss', location: {city: 'Kiev', country: 'Ukraine'} },
    //     {id: v4(), photoURL: '', followed: false, fullName: 'Vasil', status: 'Boss', location: {city: 'Gdansk', country: 'Poland'} },
}

export type UserStateType = {
    users: IUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isLoading: boolean,
    followingInProgress: number[]

}

const usersReducer = (state: UserStateType = initialState, action: UnionUserType): UserStateType => {
    switch (action.type) {
        case UserActions.SET_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case UserActions.SET_USERS:
            return {...state, users: action.users};
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

        case UserActions.TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !==action.userId)
            };
        case UserActions.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case UserActions.SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.usersCount
            };

        default:
            return state;
    }
};

export default usersReducer