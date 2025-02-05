import axios from "axios";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/user/checkAuth");
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Ensure loading is false after request
            }
        };

        checkAuth();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
};

