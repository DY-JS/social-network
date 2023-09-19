import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, AppDispatch } from "../redux/store";
import Dialogs from "../components/dialogs/Dialogs";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setSendMessageAC} from "../redux/dialogs/dialogsReducer";

const DialogsContainer = () => {

    const { dialogs, messages } = useTypedSelector((state) => state.dialogs);
    const dialogsPage = useSelector((state: AppStateType) => state.dialogs);
    const dispatch = useDispatch();

    const sendMessage = (message: string) => {
        dispatch(setSendMessageAC(message));
    };

    return <Dialogs dialogs={dialogs} messages={messages}  />;
};

export default DialogsContainer;


