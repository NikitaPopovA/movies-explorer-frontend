// IMPORT PACKAGES
import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute COMPONEN
function ProtectedRoute({ element: Component, ...props }) {
    const isLoggedIn = localStorage.getItem("jwt") !== null;
    return (
        <>
            {isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Navigate to="/" replace />
            )}
        </>
    );
}

export default ProtectedRoute;
