import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {isAuth,auth} = useSelector(state=>state.auth);
    return (
        <Route {...rest} render={props => (
            (isAuth && auth.user.role === 'user') ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;