import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [payload, setPayload] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken); // accessToken의 존재 여부로 로그인 상태 설정
    }, [payload]); // payload가 변경될 때마다 로그인 상태 갱신

    const setAuthPayload = (newPayload) => {
        setPayload(newPayload);
    };

    return (
        <AuthContext.Provider value={{ payload, setAuthPayload, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);