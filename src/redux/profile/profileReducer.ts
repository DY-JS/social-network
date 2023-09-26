import {IProfilePage, IPost, IUserProfile} from "../../components/types";

export enum Actions {
    ADD_POST ='ADD-POST',
    UPDATE_POST = 'UPDATE_POST',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export interface addPostType {
    type: Actions.ADD_POST;
    post: string
}

export type setUpdatePostType = {
    type: Actions.UPDATE_POST;
    post: string
}

export type setUserProfileType = {
    type: Actions.SET_USER_PROFILE;
    profile: IUserProfile | null
}

export type ProfileActionTypes = addPostType | setUpdatePostType | setUserProfileType

export const addPostAC= (post: string)=> ({
    type: Actions.ADD_POST,
    post
} as const)

export const setUserProfileAC= (profile: IUserProfile | null)=> ({
    type: Actions.SET_USER_PROFILE,
    profile
} as const)



const initialState: IProfilePage = {
    posts : [
        {id: 1, message: "Yo, How are you?", likesCount: 5},
        {id: 2, message: "Hi, I'm fine!", likesCount: 15},
        {id: 3, message: "Hi, Y're super cool!", likesCount: 20},
    ] as IPost[],
    userProfile: null
}

const profileReducer = (state: IProfilePage =initialState, action: ProfileActionTypes): IProfilePage => {
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

        default:
            return state;
    }
};

export default profileReducer