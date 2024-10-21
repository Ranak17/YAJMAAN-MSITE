import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedInUser } = useAuth();

    // Redirect to SignIn if the user is not logged in
    if (!isLoggedInUser) {
        return <Navigate to="/SignIn" />;
    }

    // Render the protected component if the user is logged in
    return children;
};

export default ProtectedRoute;
