import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = ({ children }) => {
    const { role, loading } = useAuth();

    if (loading) return <p>Loading...</p>; 

    return role === "ADMIN" ? children : <Navigate to="/" />;
};

export default AdminRoute;