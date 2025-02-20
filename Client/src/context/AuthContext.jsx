import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [role, setRole] = useState(null) ; 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axiosInstance.get("/user/checkAuth");
                if (res.status === 200) {
                    setIsAuthenticated(true);
                    setRole(res.data.data.user.role); 
                    localStorage.setItem("role", res.data.data.user.role); 
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false); 
            }
        };

        checkAuth();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false) ; 
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, setIsAuthenticated, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

