import { useDispatch, useSelector } from 'react-redux';
import { profileActionCreators } from "../redux/profile/profileActionCreators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Profile from "../components/profile/Profile";
import {IPost} from "../components/types";

const ProfileContainer = () => {
    const posts: IPost[] = useTypedSelector((state) => state.profile.posts);
    //const dialogsPage = useSelector((state: RootState) => state.dialogsReducer);
    const dispatch = useDispatch();

    const sendMessage = (post: string) => {
       console.log(post)
        dispatch(profileActionCreators.setAddPostAC(post));
    };

    return  <Profile posts={posts} sendMessage={sendMessage} />;
}
export default ProfileContainer;

