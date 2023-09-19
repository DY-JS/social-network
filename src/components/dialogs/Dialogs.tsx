import { NavLink } from 'react-router-dom';
import styles from './Dialogs.module.css'
import {IDialog, IMessage} from "../../redux/dialogs/dialogsReducer";

interface DialogItemProps {
    name: string;
    id: number
}

export const DialogItem = ({name, id}: DialogItemProps) => {
    console.log(id)
  return (
      <div className={styles.user + ' ' + styles.active} >
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

interface IDialogsProps {
    dialogs: IDialog[];
    messages: IMessage[];

}

const Dialogs = ({dialogs, messages}: IDialogsProps) => {

    return (
        <div className={styles.dialogs}>
            <div className={styles.users}>
                {dialogs.map(d => <DialogItem key={d.name} name={d.name} id={d.id}/>)}
            </div>
            <div className={styles.messages}>
                {messages.map(m => <Message key={m.message} message={m.message}/>)  }
            </div>
        </div>
    )
}

export default Dialogs;