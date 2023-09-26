import Header from "../components/header/Header";
import React from "react";
import axios from "axios";
import {authData, setAuthUserDataAC, setIsAuthAC} from "../redux/auth/authReducer";
import {AppStateType} from "../redux/store";
import {connect} from "react-redux";

//class
class HeaderContainer extends React.Component<any, AuthPropsType> {
    componentDidMount() {
       const {setIsAuth, setAuthUserData} = this.props
        // setIsLoading(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true
            }
        )
            .then(responce => {
                if (responce.data.resultCode === 0) {
                    const {id, login, email} = responce.data.data
                    const userData = {id, login, email}
                    console.log(userData)
                    setAuthUserData(userData)
                    setIsAuth(true)
                }
            })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}

//types
type mapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type mapDispatchToPropsType = {
    setAuthUserData: (userData: { id:number, email:string, login:string }) => void
    setIsAuth: (isAuth: boolean) => void
}

export type AuthPropsType = mapStateToPropsType & mapDispatchToPropsType

//func
const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
);

const dispatchers: mapDispatchToPropsType = {
    setAuthUserData: setAuthUserDataAC,
    setIsAuth: setIsAuthAC
}

export default connect(mapStateToProps, dispatchers)(HeaderContainer)