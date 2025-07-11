import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <Loading />
    }

    else if(!user) {
        return <Navigate state={location.pathname} to='/auth/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;