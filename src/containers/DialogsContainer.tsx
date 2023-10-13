import {useDispatch, useSelector} from 'react-redux';
import {AppStateType, AppDispatch} from "../redux/store";
import Dialogs from "../components/dialogs/Dialogs";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setSendMessageAC} from "../redux/dialogs/dialogsReducer";
import AuthRedirectForFC from "../HOC/AuthRedirectForFC";
import {FC} from "react";

interface IProps {

}

const DialogsContainer = () => {
    const {dialogs, messages} = useTypedSelector((state) => state.dialogs);
    //const { isAuth } = useTypedSelector((state) => state.auth);
    //const dialogsPage = useSelector((state: AppStateType) => state.dialogs);

    const dispatch = useDispatch();

    const sendMessage = (message: string) => {
        dispatch(setSendMessageAC(message));
    };


    return <Dialogs
        dialogs={dialogs}
        messages={messages}
        sendMessage={sendMessage}
    />;
};

export default DialogsContainer;


// const DialogsContainer: React.FC = () => {
//     const { dialogs, messages } = useTypedSelector((state) => state.dialogs);
//     const dispatch = useDispatch();
//
//     const sendMessage = (message: string) => {
//         // Dispatch your action here
//     };
//
//     // Wrap Dialogs component with AuthRedirectForFC HOC
//     const WrappedDialogs = AuthRedirectForFC(Dialogs);
//
//     return <WrappedDialogs dialogs={dialogs} messages={messages} />;
// };

//export default DialogsContainer;
