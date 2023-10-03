import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from "../redux/store";
import { addUserAC, followTC, getUsersTC,
    setCurrentPageAC, setIsLoadingAC, setTotalUsersCountAC,
    setUsersAC, unFollowTC,
} from "../redux/users/usersReducer";
import {Dispatch} from "redux";
import {IUser} from "../components/types";
import Users from "../components/users/Users";
import Loader from "../components/Loader/Loader";
import {UserResponseType, usersApi} from "../api/api";



//UsersContainer
class UsersContainer extends React.Component<any, UserPropsType> {
    componentDidMount() {
        const {pageSize, currentPage, getUsersTC} = this.props
        if (!this.props.users.length) {
           getUsersTC(currentPage, pageSize)
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
        const {pageSize, totalUsersCount, currentPage, users,
            isLoading, followingInProgress, followTC} = this.props
        console.log(users)
        return (
            <>
                {isLoading ? <Loader/> : null}
                <Users
                    users={users}
                    onChangePage={this.onChangePage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    followingInProgress={followingInProgress}
                    followTC={followTC}
                    unFollowTC={unFollowTC}
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
    setUsers: (users: IUser[]) => void,
    addUser: (user: IUser) => void,
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (usersCount: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void, //thunk-creator
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
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
    setUsers: setUsersAC,
    addUser: addUserAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    getUsersTC: getUsersTC, //thunk-creator
    followTC: followTC,
    unFollowTC: unFollowTC
}

//UsersContainer - в него передаются props(всё из mapStateToProps и mapDispatchToProps)
export default connect(mapStateToProps, dispatchers)(UsersContainer)



