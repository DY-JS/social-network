import Header from "../components/header/Header";
import React from "react";
import {getAuthUserDataTC, setAuthUserDataAC, setIsAuthAC} from "../redux/auth/authReducer";
import {AppStateType} from "../redux/store";
import {connect} from "react-redux";

//class
class HeaderContainer extends React.Component<any, AuthPropsType> {
    componentDidMount() {
       const {getAuthUserData} = this.props
        getAuthUserData()
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
    getAuthUserData: () => void
    // setIsAuth: (isAuth: boolean) => void
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
    getAuthUserData: getAuthUserDataTC,
}

export default connect(mapStateToProps, dispatchers)(HeaderContainer)