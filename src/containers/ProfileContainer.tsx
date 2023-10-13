import {connect} from 'react-redux';
import Profile from "../components/profile/Profile";
import {IPost, IUserProfile} from "../components/types";
import React, {ComponentType} from "react";
import {AppStateType} from "../redux/store";
import {addPostAC, getUserProfileTC, getUserStatusTC, updateUserStatusTC} from "../redux/profile/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import authRedirectForClass from "../HOC/AuthRedirectForClass";
import {compose} from "redux";

//Container
class ProfileContainer extends React.Component<any, RouteComponentProps<any> & ProfilePropsType> {

    componentDidMount() {
        const {getUserProfile, getUserStatus} = this.props
        let userId = this.props.match.params.userId || 2 //получили userId из параметров адресной строки
        getUserProfile(userId)
        getUserStatus(userId)
    }

    render() {
        const {posts, userProfile, addPost, status, isAuth, updateUserStatus} = this.props
        return (
            <div>
                <Profile
                    isAuth={isAuth}
                    posts={posts}
                    userProfile={userProfile}
                    addPost={addPost}
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
            </div>
        );
    }
};

//types
type mapStateToPropsType = {
    posts: IPost[],
    userProfile: IUserProfile | null
    status: string
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    addPost: (post: string) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}

export type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType

//mapStateToProps & mapDispatchToProps
let mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        posts: state.profile.posts,
        userProfile: state.profile.userProfile,
        status: state.profile.status
    })

const dispatchers = { //аналог функции mapDispatchToProps, кот по итогу такой объект
    getUserProfile: getUserProfileTC,
    addPost: addPostAC,
    getUserStatus: getUserStatusTC,
    updateUserStatus: updateUserStatusTC
}

//обернули в withRouter
//const withRouterProfileContainer = withRouter(ProfileContainer)//чтобы достать параметр userId
//обернули в WithAuthRedirect
// const withRedirectComponent = authRedirectForClass(withRouterProfileContainer) //чтобы проверить авторизацию и отправить на логин
// export default connect(mapStateToProps, dispatchers)(withRedirectComponent)

// !!! ЗАМЕНИЛИ ОБЁРТКИ withRouter И WithAuthRedirect НА COMPOSE (COMPOSE делает фабрику из HOCов)
const composeProfile = compose<RouteComponentProps<any> & ComponentType & ProfilePropsType>(
    connect(mapStateToProps, dispatchers),
    withRouter,
    authRedirectForClass
)

export default composeProfile(ProfileContainer)

// "aboutMe": "я круто чувак 1001%",
//     "contacts": {
//     "facebook": "facebook.com",
//         "website": null,
//         "vk": "vk.com/dimych",
//         "twitter": "https://twitter.com/@sdf",
//         "instagram": "instagra.com/sds",
//         "youtube": null,
//         "github": "github.com",
//         "mainLink": null
// },
// "lookingForAJob": true,
//     "lookingForAJobDescription": "не ищу, а дурачусь",
//     "fullName": "samurai dimych",
//     "userId": 2,
//     "photos": {
//     "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
//         "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
// }
