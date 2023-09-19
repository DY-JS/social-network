import React from "react";
import styles from './Post.module.css'

interface PostPros {
    message: string;
    likesCount: number
}

function Post<PostProps>({message, likesCount}: PostPros) {
    return (
        <div className={styles.post}>
          <img
              className={styles.img}
              src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"
              alt="avatar"/>
            {message}
            <span className={styles.like}>👍</span>
            <span className={styles.likesCount}>{likesCount}</span>

        </div>
    );
}

export default Post;