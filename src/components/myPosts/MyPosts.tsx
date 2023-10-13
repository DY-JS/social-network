import React, {ChangeEvent, ChangeEventHandler, useCallback, useState} from "react";
import styles from './MyPosts.module.css'
import Post from "../post/Post";
import {IPost} from "../types";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {TextArea} from "../UI/formControls/FormControls";

type FormData = {
    post: string
}

type AddNewPostFormFormDataProps = InjectedFormProps<FormData>;

const maxLength100 = maxLengthCreator(100) //валидация если пост > 300 cимволов

function AddNewPostForm({handleSubmit}: AddNewPostFormFormDataProps) {
    return (
        <form className={styles.myPosts__formblock} onSubmit={handleSubmit}>
            <Field
                //component="textarea"
                component={TextArea}
                name="post"  //values.post идёт в onSubmit = (values: FormData)
                placeholder="Your post"
                className={styles.myPosts__input}
                //onChange={changeHandler}  -- в redux-form не нужен
                validate={[required, maxLength100]}
            />
            <button
                className={styles.myPosts__button}
                type="submit"
            >
                Send
            </button>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<FormData, {}>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

interface PostsProps {
    posts: IPost[]
    sendMessage: (post: string) => void
}

function MyPosts({posts, sendMessage}: PostsProps) {
    console.log(posts)
    const [post, setPost] = useState<string>('')

    // const changeHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setPost(event.currentTarget.value)
    // }, []);

    const onSubmit = (values: FormData) => {
        //event.preventDefault()
        sendMessage(values.post)
        setPost('')
    }

    return (
        <div className={styles.myPosts}>
            <p className={styles.myPosts__title}>My Posts</p>
            <AddNewPostReduxForm onSubmit={onSubmit}/>
            <div className={styles.myPosts__posts}>
                {posts.map((p, i) => <Post message={p.message} key={p.message + i} likesCount={p.likesCount}/>)}
            </div>
        </div>
    );
}


export default MyPosts;
