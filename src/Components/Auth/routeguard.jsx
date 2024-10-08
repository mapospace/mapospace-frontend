import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth'; 
const GuardedRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component /> : <Navigate to="/Login" />;
};


export default GuardedRoute;
