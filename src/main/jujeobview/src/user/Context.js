/*import React, { createContext, useState, useContext, useEffect } from 'react';

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

export const useAuth = () => useContext(AuthContext);*/

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [payload, setPayload] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            updatePayloadFromToken(accessToken); // 토큰에서 payload 추출 및 설정
            setIsLoggedIn(!!accessToken);
        } else {
            setIsLoggedIn(false);
            setPayload(null); // 로그아웃 또는 토큰 없음 상태 처리
        }
    }, []);

    // 토큰에서 payload 추출하여 상태 업데이트
    const updatePayloadFromToken = (token) => {
        try {
            const [, payloadBase64] = token.split(".");
            const correctedBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
            const payloadString = atob(correctedBase64);
            const newPayload = JSON.parse(payloadString);
            setPayload(newPayload);
        } catch (error) {
            console.error('Error parsing access token:', error);
            setPayload(null);
        }
    };

    const setAuthPayload = (newPayload) => {
        setPayload(newPayload);
        setIsLoggedIn(true); // 로그인 상태를 true로 설정
    };

    return (
        <AuthContext.Provider value={{ payload, setAuthPayload, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

