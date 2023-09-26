import React from 'react';
import axios from 'axios';
import {UserPropsType} from "../../containers/UsersContainer";
import s from './user.module.css'
import {IUser} from "../types";
import {NavLink} from 'react-router-dom';
import {FollowUserResponseType, usersApi} from "../../api/api";

type UsersPropsType = {
    users: IUser[]
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
    onChangePage: (pageNumber: number) => void
    toggleFollowingProgress: (isLoading: boolean, userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: number[]
}
//FUnctional Component
const Users = ({
                   follow, unFollow, totalUsersCount, pageSize, currentPage, users, onChangePage,
                   toggleFollowingProgress, followingInProgress
               }: UsersPropsType) => {
    console.log(followingInProgress)
    const makeUnFollowRequest = (userId: number) => {
        // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
        //     {
        //         withCredentials: true
        //     })
        //setIsLoading(true)
        toggleFollowingProgress(true, userId)
        usersApi.unFollowUserById(userId)
            .then((data: FollowUserResponseType) => {
                    if (data.resultCode === 0) {
                        unFollow(userId)
                        toggleFollowingProgress(false, userId)
                    }
                }
            )
    }

    const makeFollowRequest = (userId: number) => {
        //setIsLoading(true)
        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {withCredentials: true},
        //     )
        toggleFollowingProgress(true, userId)
        usersApi.followUserById(userId)
            .then((data: FollowUserResponseType) => {
                    if (data.resultCode === 0) {
                        follow(userId)
                        toggleFollowingProgress(false, userId)
                    }
                }
            )
    }

    let totalPagesCount = Math.ceil(totalUsersCount / pageSize)
    //console.log("a ",Array.from(Array(10).keys()))
    totalPagesCount = totalPagesCount > 20 ? 20 : totalPagesCount
    let pages = []
    for (let i = 0; i < totalPagesCount; i++) {
        pages.push(i + 1)
    }

    return (
        <div>
            <div style={{padding: "40px"}}>
                {pages.map(p => (
                    <span
                        className={currentPage === p ? `${s.selectedPage}` : `${s.page}`}
                        key={p}
                        onClick={() => onChangePage(p)}
                    >
                            {p}
                        </span>
                ))}
            </div>

            {users?.map((u: IUser) =>
                <div key={u.id} className={s.container}>
                    <div className={s.photo_and_button}>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={s.photo}
                                 src={
                                     u.photos.small
                                         ? u.photos.small
                                         : 'https://m.gordonua.com/img/article/15924/50_tn.jpg?v1643214151'
                                 }
                                 alt={"avatar"}/>
                        </NavLink>
                        {u.followed
                            ? <button
                                onClick={() => makeUnFollowRequest(u.id)}
                                className={s.button}
                                disabled={followingInProgress?.some(id => id === u.id)}
                            >UNFOLLOW
                            </button>
                            : <button
                                onClick={() => makeFollowRequest(u.id)}
                                className={s.button}
                                disabled={followingInProgress?.some(id => id === u.id)}
                            >FOLLOW
                            </button>
                        }
                    </div>
                    <div className={s.user_info}>
                        <div className={s.name_status}>
                            <h2>{u.name}</h2>
                            <span>{u.status}</span>
                        </div>
                        <div className={s.location}>
                            {/*<span>{u.location.city}</span>*/}
                            {/*<span>{u.location.country}</span>*/}
                        </div>

                    </div>
                </div>)}
        </div>
    );
}

export default Users;
