import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import api, { setAuthToken } from '../api/api';

// Create UserContext
const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({ ...decodedToken, token });
        }
    }, []);

    // login user and set JWT token 
    const login = async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        setAuthToken(jwtToken);  // Set the token for future requests
        const decodedToken = jwtDecode(jwtToken);
        setUser({ ...decodedToken, token: jwtToken });
    };

    // logout user anddelete JWT token from localStorage
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
