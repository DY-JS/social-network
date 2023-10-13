import {NavLink, Redirect} from "react-router-dom";
import styles from './Dialogs.module.css'
import {IDialog, IMessage} from "../../redux/dialogs/dialogsReducer";
import {FC, useState} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../UI/formControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

interface DialogItemProps {
    name: string;
    id: number,
}

export const DialogItem = ({name, id}: DialogItemProps) => {
    console.log(id)
    return (
        <div className={styles.user + ' ' + styles.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

interface MessageProps {
    message: string;
}

export const Message = ({message}: MessageProps) => {
    return (
        <div className={styles.message}>{message}</div>
    )
}

type FormData = {
    message: string;
};

type AddMessageFormDataProps = InjectedFormProps<FormData>;
// interface AddMessageFormProps {
//     // newMessage: string;
//     // changeMessage: (message: string) => void
// }

const maxLength100 = maxLengthCreator(100) //валидация если пост > 100 cимволов

const AddMessageForm = ({handleSubmit}: AddMessageFormDataProps) => {
    return (
    <form onSubmit={handleSubmit}>
        <div>
            <Field
                //component="textarea"
                component={TextArea}
                name="message"
                placeholder="Enter message"
                validate={[required, maxLength100]}
            />
            {/*<textarea*/}
            {/*    value={newMessage}*/}
            {/*    onChange={(e)=>{changeMessage(e.currentTarget.value)}}*/}
            {/*    placeholder="Enter message"*/}
            {/*    />*/}
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>)
}

const AddMessageReduxForm = reduxForm<FormData, {}>({form: "dialogAddMessageForm"})(AddMessageForm)

interface IDialogsProps {
    dialogs: IDialog[];
    messages: IMessage[];
    sendMessage: (message: string) => void
}
const Dialogs: FC<IDialogsProps> = ({dialogs, messages, sendMessage}) => {
    //if(!isAuth) return <Redirect to={'/login'}/>
    // const [newMessage, setNewMessage] = useState('')
    const addNewMessage = (values: FormData ) => {
        alert(values.message)
        sendMessage(values.message)
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.users}>
                {dialogs.map(d => <DialogItem key={d.name} name={d.name} id={d.id}/>)}
            </div>
            <div className={styles.messages}>
                {messages.map(m => <Message key={m.message} message={m.message}/>)}
            </div>
            <AddMessageReduxForm
                onSubmit={addNewMessage}
                // newMessage={newMessage}
                // changeMessage={setNewMessage}
            />
        </div>
    )
}

export default Dialogs;