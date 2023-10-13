import React, {Component, ComponentType} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import { Dispatch } from 'redux';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AppStateType} from "../redux/store";

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type mapStatePropsType = ReturnType<typeof mapStateToProps>

function authRedirectForClass <T>(Component: ComponentType<T>)  {
    const WithAuth  = (props: mapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to="/login" />;
        }

        return <Component {...restProps as T} />;
    };

    return connect(mapStateToProps)(WithAuth);
};

export default authRedirectForClass;
