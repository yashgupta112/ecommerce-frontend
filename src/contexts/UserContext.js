import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import api, { setAuthToken } from '../api/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({ ...decodedToken, token });
        }
    }, []);


    const login = async (credentials) => {
        // Implement login logic here (e.g., API call)
        // For example:
        const response = await api.post('/auth/login', credentials);
        const { jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        setAuthToken(jwtToken);  // Set the token for future requests
        const decodedToken = jwtDecode(jwtToken);
        setUser({ ...decodedToken, token: jwtToken });

        // Simulate a login for demonstration
        // const token = 'your.jwt.token.here'; // Replace with actual JWT token
        // localStorage.setItem('token', token);
        // const decodedToken = jwtDecode(token);
        // setUser({ ...decodedToken, token });
    };

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

export const useUser = () => useContext(UserContext);
