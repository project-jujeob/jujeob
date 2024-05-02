import React, { createContext, useState, useContext, useEffect } from 'react';
import base64 from "base-64";

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
            const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
            const decodedData = decodeURIComponent(escape(window.atob(base64)));
            const newPayload = JSON.parse(decodedData);
            setPayload(newPayload);
        } catch (error) {
            console.error('Error parsing access token:', error);
            setPayload(null);
        }
    };
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
            const decodedData = base64.decode(payloadBase64);
            const newPayload = JSON.parse(decodedData);
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