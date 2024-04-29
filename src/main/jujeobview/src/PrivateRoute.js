import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './user/Context'; // Auth 컨텍스트 사용

function PrivateRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const [readyToRedirect, setReadyToRedirect] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            // alert 를 동기적으로 호출하고 사용자가 확인을 누르면 상태를 업데이트
            alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
            setReadyToRedirect(true); // 사용자가 alert 확인 후 상태 업데이트
        }
    }, [isLoggedIn]);

    if (!isLoggedIn && readyToRedirect) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
}

export default PrivateRoute;
