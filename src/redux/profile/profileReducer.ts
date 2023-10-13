import {IProfilePage, IPost, IUserProfile} from "../../components/types";
import {Dispatch} from "redux";
import {profileApi, usersApi} from "../../api/api";


//types
export enum Actions {
    ADD_POST = 'ADD-POST',
    UPDATE_POST = 'UPDATE_POST',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    SET_USER_STATUS = 'SET_USER_STATUS',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
}

export interface AddPostType {
    type: Actions.ADD_POST;
    post: string
}

export type SetUpdatePostType = {
    type: Actions.UPDATE_POST;
    post: string
}

export type SetUserProfileType = {
    type: Actions.SET_USER_PROFILE;
    profile: IUserProfile | null
}

export type SetUserStatusType = ReturnType<typeof setUserStatusAC>
export type UpdateUserStatusType = ReturnType<typeof updateUserStatusAC>

export type ProfileActionTypes = AddPostType | SetUpdatePostType
    | SetUserProfileType | SetUserStatusType | UpdateUserStatusType

//action-creators
export const addPostAC = (post: string) => ({
    type: Actions.ADD_POST,
    post
} as const)

export const setUserProfileAC = (profile: IUserProfile | null) => ({
    type: Actions.SET_USER_PROFILE,
    profile
} as const)

export const setUserStatusAC = (status: string) => ({
    type: Actions.SET_USER_STATUS,
    status
} as const)

export const updateUserStatusAC = (status: string) => ({
    type: Actions.UPDATE_USER_STATUS,
    status
} as const)


//thunks
export const getUserProfileTC = (userId: number) => (dispatch: Dispatch) => {
    profileApi.getUsersProfile(userId)
        .then(res => {
            dispatch(setUserProfileAC(res.data))
        })
}

export const getUserStatusTC = (userId: number) => (dispatch: Dispatch) => {
    profileApi.getUsersStatus(userId)
        .then(res => {
            if (res.data) {
                dispatch(setUserStatusAC(res.data))
            }
        })
}

export const updateUserStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setUserStatusAC(status))
            }
        })
}

//reducer
const initialState: IProfilePage = {
    posts: [
        {id: 1, message: "Yo, How are you?", likesCount: 5},
        {id: 2, message: "Hi, I'm fine!", likesCount: 15},
        {id: 3, message: "Hi, Y're super cool!", likesCount: 20},
    ] as IPost[],
    userProfile: null,
    status: ''
}

const profileReducer = (state: IProfilePage = initialState, action: ProfileActionTypes): IProfilePage => {
    switch (action.type) {
        case Actions.ADD_POST:
            const ids = state.posts.map(p => p.id);
            const maxId = Math.max(...ids);
            const newPost = {
                id: maxId + 1,
                message: action.post,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        // case Actions.UPDATE_POST:
        //     return {...state, userProfile: action.profile}

        case Actions.SET_USER_PROFILE:
            return {...state, userProfile: action.profile}
        case Actions.SET_USER_STATUS:
            return {...state, status: action.status}
        case Actions.UPDATE_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
};

export default profileReducer