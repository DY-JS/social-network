export interface IPost {
    id: number;
    message: string;
    likesCount: number
}

export interface IProfilePage {
    posts: IPost[],
    userProfile: IUserProfile | null

}

export interface IUser {
    id: number;
    name: string;
    photos: {
        small: string | null,
        large: string | null,
    };
    followed: boolean;
    uniqueUrlName: string | null
    status: string | null;
}

export type SidebarType = {}

export interface IUserProfile {
    aboutMe: string,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null,
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string | null,
        large: string | null,
    }
}

// export interface IRootState {
//     profilePage: IProfilePage;
//     dialogsPage: IDialogsPage;
//     sidebar: SidebarType;
// }

