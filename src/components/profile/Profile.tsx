import React from "react";
import styles from './Profile.module.css'
import MyPosts from "../myPosts/MyPosts";
import ProfileInfo from "../profileInfo/ProfileInfo";
import {IPost, IUserProfile} from "../types";
import {Redirect} from "react-router-dom";

interface ProfileProps {
    posts: IPost[]
    userProfile: IUserProfile | null
    addPost: (post: string) => void
    updateUserStatus: (status: string) => void
    isAuth: boolean
    status: string
}

function Profile({posts, userProfile, addPost, status, updateUserStatus}: ProfileProps) {
    // if(!isAuth) return <Redirect to={'/login'}/>
    return (

        <div className={styles.content}>
            <ProfileInfo
                userProfile={userProfile}
                status={status}
                updateUserStatus={updateUserStatus}
            />
            <MyPosts posts={posts} sendMessage={addPost}/>
        </div>
    );
}

export default Profile;
