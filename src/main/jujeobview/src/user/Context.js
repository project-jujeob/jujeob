import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [payload, setPayload] = useState(null);

    const setAuthPayload = (newPayload) => {
        setPayload(newPayload);
    };

    return (
        <AuthContext.Provider value={{ payload, setAuthPayload }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);