import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from "../redux/store";
import {
    addUserAC,
    followUserAC,
    setCurrentPageAC, setIsLoadingAC, setTotalUsersCountAC,
    setUsersAC, toggleFollowingProgressAC,
    unFollowUserAC,
    UserStateType
} from "../redux/users/usersReducer";
import {Dispatch} from "redux";
import {IUser} from "../components/types";
import Users from "../components/users/Users";
import axios from "axios";
import s from "src/components/users/user.module.css";
import Loader from "../components/Loader/Loader";
import {UserResponseType, usersApi} from "../api/api";



//UsersContainer
class UsersContainer extends React.Component<any, UserPropsType> {
    componentDidMount() {
        const {pageSize, setUsers, setTotalUsersCount, currentPage, setIsLoading} = this.props
        setIsLoading(true)
        if (!this.props.users.length) {
            usersApi.getUsers(currentPage, pageSize)
                .then((data: UserResponseType ) => {
                    setUsers(data.items)
                    setTotalUsersCount(data.totalCount)
                    setIsLoading(false)
                })
        } else if (this.props.users.length) {
            setIsLoading(false)
        }
    }

    componentWillUnmount() {
       const {setIsLoading} = this.props
        setIsLoading(false)
    }

    onChangePage = (pageNumber: number) => {
        const {pageSize, setCurrentPage} = this.props
        setCurrentPage(pageNumber)
        usersApi.getUsers(pageNumber, pageSize)
            .then((data: UserResponseType) => this.props.setUsers(data.items))
    }

    render() {
        const {pageSize, totalUsersCount, currentPage, users, follow,
            unFollow, isLoading, toggleFollowingProgress, followingInProgress} = this.props
        console.log(isLoading)
        return (
            <>
                {isLoading ? <Loader/> : null}
                <Users
                    users={users}
                    follow={follow}
                    unFollow={unFollow}
                    onChangePage={this.onChangePage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    followingInProgress={followingInProgress}
                    toggleFollowingProgress={toggleFollowingProgress}
                />
            </>

        )
    }
};

//types
type mapStateToPropsType = {
    users: IUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isLoading: boolean,
    followingInProgress: number[] //для определения на какие id нажали follow/unfollow
}

type mapDispatchToPropsType = {
    setIsLoading: (isLoading: boolean) => void
    setUsers: (users: IUser[]) => void,
    addUser: (user: IUser) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (usersCount: number) => void
    toggleFollowingProgress: (isLoading: boolean, userId: number) => void
}

export type UserPropsType = mapStateToPropsType & mapDispatchToPropsType

//func
const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isLoading: state.users.isLoading,
        followingInProgress: state.users.followingInProgress,
    }
);

//1-й вар
// const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
//     return {
//         setIsLoading: (isLoading: boolean) => dispatch(setIsLoadingAC(isLoading)),
//         setUsers: (users: IUser[]) => dispatch(setUsersAC(users)),
//         addUser: (user: IUser) => dispatch(addUserAC(user)),
//         follow: (userId: number) => dispatch(followUserAC(userId)),
//         unFollow: (userId: number) => dispatch(unFollowUserAC(userId)),
//         setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
//         setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCountAC(usersCount)),
//     }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)


//2-й вар
const dispatchers = {  //аналог функции mapDispatchToProps, кот по итогу возвр такой объект
    setIsLoading: setIsLoadingAC,
    setUsers: setUsersAC,
    addUser: addUserAC,
    follow: followUserAC,
    unFollow: unFollowUserAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleFollowingProgress: toggleFollowingProgressAC
}

//UsersContainer - в него передаются props(всё из mapStateToProps и mapDispatchToProps)
export default connect(mapStateToProps, dispatchers)(UsersContainer)



