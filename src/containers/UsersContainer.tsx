import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from "../redux/store";
import {addUserAC, followUserAC, setUsersAC, unFollowUserAC, UserStateType} from "../redux/users/usersReducer";
import {Dispatch} from "redux";
import {IUser} from "../components/types";
import Users from "../components/users/Users";

//types
type mapStateToPropsType = {
    users: IUser[]
}

type mapDispatchToPropsType = {
    setUsers: (users: IUser[]) => void,
    addUser: (user: IUser) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
}

export type UserPropsType = mapStateToPropsType & mapDispatchToPropsType
//func
const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    { users: state.users.users}
);

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        setUsers: (users: IUser[]) => dispatch(setUsersAC(users)),
        addUser: (user: IUser) => dispatch(addUserAC(user)),
        follow: (userId: number) => dispatch(followUserAC(userId)),
        unFollow: (userId: number) => dispatch(unFollowUserAC(userId)),
    }
}

//UsersContainer
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)



