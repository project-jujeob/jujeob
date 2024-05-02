import './MainPage.css';
import { Link, useNavigate } from "react-router-dom"; // useHistory 추가
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
    const [payload, setPayload] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 로그인 상태 확인
    const checkLoginStatus = () => {
        setIsLoggedIn(!!accessToken || !!refreshToken);

        if (accessToken) {
            try {
                const [, payloadBase64] = accessToken.split(".");
                // URL-safe Base64를 정규 Base64로 변환
                const correctedBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
                const payloadString = atob(correctedBase64);
                const newPayload = JSON.parse(payloadString);
                setPayload(newPayload);
            } catch (error) {
                console.error('Error parsing access token:', error);
            }
        }
    };

    // 로그아웃 처리
    const logoutAction = async () => {
        try {
            await axios.delete('/api/auth/logout', {
                data: {
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
            });
            console.log('Logout successful');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setTimeout(() => window.location.reload(), -100); // 새로고침이 일어나기 전에 로그아웃 상태 반영
            setIsLoggedIn(false); // 페이지를 새로고침하여 앱 상태를 리셋
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <Link to="/ProductList">
                            <button>술 정보</button>
                        </Link>
                        <Link to={"/BbsList"}>
                            <button>커뮤니티</button>
                        </Link>
                        <Link to={"/Announcement"}>
                            <button>공지사항</button>
                        </Link>
                        <Link to={"/Cart"}>
                            <button>장바구니</button>
                        </Link>
                        {isLoggedIn && payload.role === "ADMIN" ? (
                            <>
                                <Link to="/Admin">
                                    <button>관리자</button>
                                </Link>
                                <button onClick={logoutAction}>로그아웃</button>
                            </>
                        ) : isLoggedIn && payload.role === "USER" ? (
                            <>
                                <Link to={'/Cart'}>
                                    <button>장바구니</button>
                                </Link>
                                <Link to={'/MyPage'}>
                                    <button>마이페이지</button>
                                </Link>
                                <button onClick={logoutAction}>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/Login">
                                <button>로그인</button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="MainContent">
                    <div className="MainTitle">
                        <h1>JU JEOB</h1>
                    </div>
                    <div className="MainBtn">
                        <Link to="/ProductList">
                            <button>오늘의 추천 주류</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

/*
import './MainPage.css';
import { Link, useNavigate } from "react-router-dom"; // useHistory 추가
import axios from "axios";
import {useAuth} from "./user/Context";

function MainPage() {
    const { payload, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // 로그아웃 처리
    const logoutAction = async () => {
        try {
            await axios.delete('/api/auth/logout', {
                data: {
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
            });
            console.log('Logout successful');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');  // 로그아웃 후 홈으로 리다이렉트
            window.location.reload();  // 페이지를 새로고침하여 앱 상태를 리셋
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <Link to="/ProductList">
                            <button>술 정보</button>
                        </Link>
                        <Link to={"/BbsList"}>
                            <button>커뮤니티</button>
                        </Link>
                        <Link to={"/Announcement"}>
                            <button>공지사항</button>
                        </Link>
                        <Link to={"/Cart"}>
                            <button>장바구니</button>
                        </Link>
                        {isLoggedIn && payload.role === "ADMIN" ? (
                            <>
                                <Link to="/Admin">
                                    <button>관리자</button>
                                </Link>
                                <button onClick={logoutAction}>로그아웃</button>
                            </>
                        ) : isLoggedIn && payload.role === "USER" ? (
                            <>
                                <Link to={'/Cart'}>
                                    <button>장바구니</button>
                                </Link>
                                <Link to={'/MyPage'}>
                                    <button>마이페이지</button>
                                </Link>
                                <button onClick={logoutAction}>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/Login">
                                <button>로그인</button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="MainContent">
                    <div className="MainTitle">
                        <h1>JU JEOB</h1>
                    </div>
                    <div className="MainBtn">
                        <Link to="/ProductList">
                            <button>오늘의 추천 주류</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;*/
