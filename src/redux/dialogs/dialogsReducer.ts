
//types
export interface IDialog {
    id: number;
    name: string;
}

export interface IMessage {
    id: number
    message: string;
}

export interface IDialogsPage {
    dialogs: IDialog[];
    messages: IMessage[];
}


// actions, actions-creators, action-types
export enum DialogActions {
    SEND_MESSAGE="SEND_MESSAGE",
    UPDATE_MESSAGE="UPDATE_MESSAGE"
}

export type UpdateMessageAT = ReturnType<typeof updateMessageAC>
export const updateMessageAC = (message: string) => ({
    type: DialogActions.UPDATE_MESSAGE,
    message
})


export type SetSendMessageAT = ReturnType<typeof setSendMessageAC>
export const setSendMessageAC = (message: string) => ({
    type: DialogActions.SEND_MESSAGE,
    message
})

//uniontype
export type DialogActionsType = SetSendMessageAT | UpdateMessageAT

const initialState: IDialogsPage = {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Victor'},
                {id: 5, name: 'Valera'},
            ] as IDialog[],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hi, How are you?'},
                {id: 3, message: 'Yo!!!'},
                {id: 4, message: 'Yo!!!'},
                {id: 5, message: 'Yo!!!'},
            ] as IMessage[]
        }

 //reducer
 const dialogsReducer = (state=initialState, action: DialogActionsType): IDialogsPage=> {
    switch (action.type) {
        case DialogActions.SEND_MESSAGE: {
            const ids = state.messages.map(m => m.id)
            const maxId = Math.max(...ids)
            let newMessage = {
                id: maxId + 1,
                message: action.message
            }
            return {...state, messages: [...state.messages,newMessage]}
        }
        default: return state;
        //case DialogActions.UPDATE_MESSAGE:
    }

 }

 export default  dialogsReducer