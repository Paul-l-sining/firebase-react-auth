import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({element, redirect} : any) {
    
    const { currentUser } = useAuth();
    
    if (currentUser) return element;

    return <Navigate to={redirect} />;
}

export default PrivateRoute;