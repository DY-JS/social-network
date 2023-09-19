import React from "react";
import styles from './Profile.module.css'
import MyPosts from "../myPosts/MyPosts";
import ProfileInfo from "../profileInfo/ProfileInfo";
import {IPost} from "../types";

interface ProfileProps {
    posts: IPost[]
    sendMessage: (post: string)=> void
}

function Profile({posts, sendMessage}: ProfileProps) {
    return (
            <div className={styles.content}>
                <ProfileInfo/>
                <MyPosts posts={posts} sendMessage={sendMessage}/>
            </div>
    );
}

export default Profile;
