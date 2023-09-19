import {IProfilePage, IPost} from "../../components/types";

export enum Actions {
    ADD_POST ='ADD-POST',
    UPDATE_POST = 'UPDATE_POST'
}

export interface setAddPostType {
    type: Actions.ADD_POST;
    payload: string
}

export interface setUpdatePostType {
    type: Actions.UPDATE_POST;
    payload: string
}

export type ActionTypes = setAddPostType | setUpdatePostType

const initialState: IProfilePage = {
    posts: [
        {id: 1, message: "Yo, How are you?", likesCount: 5},
        {id: 2, message: "Hi, I'm fine!", likesCount: 15},
        {id: 3, message: "Hi, Y're super cool!", likesCount: 20},
    ]
}

const profileReducer = (state: IProfilePage =initialState, action: ActionTypes) => {
    switch (action.type) {
        case Actions.ADD_POST:
            const ids = state.posts.map(p => p.id);
            const maxId = Math.max(...ids);
            const newPost = {
                id: maxId + 1,
                message: action.payload,
                likesCount: 0
            };
            console.log(state)
            return {
                ...state,
                posts: [...state.posts, newPost]
            };

        default:
            return state;
    }
};

export default profileReducer