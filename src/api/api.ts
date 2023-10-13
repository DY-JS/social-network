import axios from "axios";
import {IUser, ResponseResultType} from "../components/types";

const  instance = axios.create({
 withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    //headers: {"API-KEY": "5a9e8922-3928-40e1-b914-a7b735058108"},
})

export const usersApi = {
    getUsers(page = 1, pageSize = 5) {
        return instance.get<UserResponseType>(`users?page=${page}&${pageSize}`)
            .then(response => response.data)
    },

    followUserById(userId: number) {
        return instance.post<FollowUserResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },

    unFollowUserById(userId: number) {
        return instance.delete<FollowUserResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

export const profileApi = {
    getUsersProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },

    getUsersStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },

    updateStatus(status: string) {
        const body: {status: string} = { status }
        return instance.put<ResponseResultType>(`profile/status`, body)
    }

}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    }
}


//types
export type UserResponseType = {
    items: IUser[],
    totalCount: number,
    error: string | null
}

export type FollowUserResponseType ={
    resultCode: number
    messages: string[],
    data: Object
}
