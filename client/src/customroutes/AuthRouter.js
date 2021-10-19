import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const AuthRouter = ({component: Component, ...rest}) => {
	const {isAuth,auth} = useSelector(state=>state.auth);
    return (
        <Route {...rest} render={props => (
            !isAuth ?
                <Component {...props} />
            : (isAuth && auth.user.role === "user") ?
                <Redirect to="/home" />
            : <Redirect to="/admin/dashboard" />
        )} />
    );
};

export default AuthRouter;