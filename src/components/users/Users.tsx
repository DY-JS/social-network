import React from 'react';
import axios from 'axios';
import {UserPropsType} from "../../containers/UsersContainer";
import s from './user.module.css'
import {IUser} from "../types";

const Users = (props: UserPropsType) => {
    console.log(props.users)
    if (!props.users.length) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(responce => props.setUsers(responce.data.items))

    }
    return (
        <div>
            {props.users?.map(u =>
                <div key={u.id} className={s.container}>
                    <div className={s.photo_and_button}>
                        <img className={s.photo}
                             src={
                                 u.photos.small
                                     ? u.photos.small
                                     : 'https://m.gordonua.com/img/article/15924/50_tn.jpg?v1643214151'
                             }
                             alt={"avatar"}/>
                        {u.followed
                            ? <button
                                onClick={() => props.unFollow(u.id)}
                                className={s.button}
                            >UNFOLLOW
                            </button>
                            : <button
                                onClick={() => props.follow(u.id)}
                                className={s.button}
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
};

export default Users;