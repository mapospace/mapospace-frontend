import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Initialize state from sessionStorage
        const token = sessionStorage.getItem('token');
        return token ? true : false;
    });

    useEffect(() => {
        // Update sessionStorage whenever isAuthenticated state changes
        if (!isAuthenticated) {
            sessionStorage.removeItem('token');
        }
    }, [isAuthenticated]);

    const login = (token) => {
        sessionStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
