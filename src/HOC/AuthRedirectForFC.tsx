import React, { ComponentType } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

type AuthProps = {
    isAuth: boolean;
};

const AuthRedirectForFC = <P extends AuthProps>(
    WrappedComponent: ComponentType<P & RouteComponentProps>
): React.FC<P & RouteComponentProps> => {
    const WithAuth: React.FC<P & RouteComponentProps> = (props) => {
        const isAuth = useTypedSelector((state) => state.auth.isAuth);

        if (!isAuth) {
            return <Redirect to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuth;
};

export default AuthRedirectForFC;
