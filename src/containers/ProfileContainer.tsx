import {connect, useDispatch, useSelector} from 'react-redux';
import {profileActionCreators} from "../redux/profile/profileActionCreators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Profile from "../components/profile/Profile";
import {IPost, IUser, IUserProfile} from "../components/types";
import React from "react";
import axios from "axios";
import {AppStateType} from "../redux/store";
import {addPostAC, setUserProfileAC} from "../redux/profile/profileReducer";
import {withRouter} from "react-router-dom";

//Container
class ProfileContainer extends React.Component<any, ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId || 2 //получили userId из параметров адресной строки

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setProfileUserData(response.data)
            })
    }


    render() {
        const {posts, userProfile, setProfileUserData, addPost} = this.props
        return (
            <div>
                {/*<div className={styles.content}>*/}
                {/*<Profile {...this.props}/>*/}
                <Profile
                    posts={posts}
                    setProfileUserData={setProfileUserData}
                    userProfile={userProfile}
                    addPost={addPost}
                />

                {/*<MyPosts posts={posts} sendMessage={sendMessage}/>*/}
                {/*</div>*/}
            </div>
        );
    }
};

//types
type mapStateToPropsType = {
    posts: IPost[],
    userProfile: IUserProfile | null
}

type mapDispatchToPropsType = {
    setProfileUserData: (profile: IUserProfile | null) => void
    addPost: (post: string) => void
}

export type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType

//mapStateToProps & mapDispatchToProps
let mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        posts: state.profile.posts,
        userProfile: state.profile.userProfile
    })

const dispatchers = { //аналог функции mapDispatchToProps, кот по итогу такой объект
    setProfileUserData: setUserProfileAC,
    addPost: addPostAC
}

//withRouter & connect
const withRouterProfileContainer = withRouter(ProfileContainer) //чтобы достать параметр userId

export default connect(mapStateToProps, dispatchers)(withRouterProfileContainer)


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


// const ProfileContainer = () => {
//     const posts: IPost[] = useTypedSelector((state) => state.profile.posts);
//     //const dialogsPage = useSelector((state: RootState) => state.dialogsReducer);
//     const dispatch = useDispatch();
//
//     const sendMessage = (post: string) => {
//        console.log(post)
//         dispatch(profileActionCreators.setAddPostAC(post));
//     };
//
//     return  <Profile posts={posts} sendMessage={sendMessage} />;
// }
// export default ProfileContainer;

