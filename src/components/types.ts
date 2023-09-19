
export interface IPost {
    id: number;
     message: string;
     likesCount: number
}

export interface IProfilePage {
    posts: IPost[]
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

// export interface IRootState {
//     profilePage: IProfilePage;
//     dialogsPage: IDialogsPage;
//     sidebar: SidebarType;
// }

