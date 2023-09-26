export const SET_USER_DATA = 'SET_USER_DATA'
export const SET_IS_AUTH = 'SET_IS_AUTH'

export type authData = {
    id: number| null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

const initialState: authData = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

//reducer
const authReducer = (state = initialState, action: UnionAuthType):authData => {
    switch (action.type) {
        case SET_USER_DATA: return {...state, ...action.data};
        case SET_IS_AUTH: return {...state, isAuth: action.isAuth};

        default: return state
    }
}

//AC
export const setAuthUserDataAC = (data: { id:number, email:string, login:string }) => ({type: SET_USER_DATA, data} as const)
export const setIsAuthAC = (isAuth: boolean) => ({type: SET_IS_AUTH, isAuth} as const)

//Action Types
export type SetAuthUserDataAT = ReturnType<typeof setAuthUserDataAC>
export type SetIsAuthAT = ReturnType<typeof setIsAuthAC>

type UnionAuthType = SetAuthUserDataAT | SetIsAuthAT

export default authReducer