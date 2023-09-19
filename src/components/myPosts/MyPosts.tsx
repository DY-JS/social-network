import React, {ChangeEvent, ChangeEventHandler, useCallback, useState} from "react";
import styles from './MyPosts.module.css'
import Post from "../post/Post";
import {IPost} from "../types";

interface PostsProps {
    posts: IPost[]
    sendMessage: (post: string) => void
}

function MyPosts({posts, sendMessage}: PostsProps) {
    console.log(posts)
    const [post, setPost] = useState<string>('')

    const changeHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(event.currentTarget.value)
    }, []);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        sendMessage(post)
        setPost('')
    }

    return (
            <div className={styles.myPosts}>
                <p className={styles.myPosts__title}>My Posts</p>
                <form className={styles.myPosts__formblock} onSubmit={onSubmit}>
                    <textarea
                        value={post}
                        placeholder="Your post"
                        className={styles.myPosts__input}
                        onChange={changeHandler}
                    />
                    <button
                        className={styles.myPosts__button}
                        type="submit"
                        >
                        Send
                    </button>
                </form>
                <div className={styles.myPosts__posts}>
                    {posts.map((p, i) => <Post message={p.message} key={p.message+ i} likesCount={p.likesCount}/>)}
                </div>
            </div>
    );
}

export default MyPosts;
