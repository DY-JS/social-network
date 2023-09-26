import React from "react";
import styles from './Profile.module.css'
import MyPosts from "../myPosts/MyPosts";
import ProfileInfo from "../profileInfo/ProfileInfo";
import {IPost, IUserProfile} from "../types";

interface ProfileProps {
    posts: IPost[]
    userProfile: IUserProfile | null
    addPost: (post: string)=> void
    setProfileUserData: (profile: IUserProfile | null) => void
}

function Profile({posts, userProfile, setProfileUserData, addPost}: ProfileProps) {
    return (
            <div className={styles.content}>
                <ProfileInfo userProfile={userProfile}/>
                <MyPosts posts={posts} sendMessage={addPost}/>
            </div>
    );
}

export default Profile;
