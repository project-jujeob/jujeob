import CommonLogo from '../img/CommonLogo.png';
import {Link, useLocation} from "react-router-dom";
import './Header.css';
import { useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../user/Context";

function Header() {
    const { payload, setAuthPayload } = useAuth(); // Context에서 payload 및 setAuthPayload 가져오기
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');


    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const checkLoginStatus = () => {
        // 엑세스 토큰 또는 리프레시 토큰의 존재 여부로 로그인 상태 결정
        setIsLoggedIn(!!accessToken || !!refreshToken);

        if (accessToken) {
            try {
                const [, payloadBase64] = accessToken.split(".");
                const payloadString = atob(payloadBase64);
                const payload = JSON.parse(payloadString);
                console.log("Access Token payload:", payload);
            } catch (error) {
                console.error('Error parsing access token:', error);
            }
        }
    };

    //로그아웃
    const logoutAction = () => {

        axios({
            method: 'DELETE',
            url: '/api/auth/logout',
            data: {
                accessToken,
                refreshToken
            }
        })
            .then(response => {
                console.log('Logout successful');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setIsLoggedIn(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="Header">
            <div className="HeaderLogo">
                <Link className="HeaderLink" to={'/'}>
                    <img src={CommonLogo} alt="헤더로고"/>
                    <p>JU JEOB</p>
                </Link>
            </div>
            <div className="HeaderMenu">
                <Link to={'/ProductList'}>
                    <button>술 정보</button>
                </Link>
                <Link to={'/BbsList'}>
                    <button>커뮤니티</button>
                </Link>
                <Link to={'/Announcement'}>
                    <button>공지사항</button>
                </Link>
                {/*{payload && payload.memberRole === "admin" ? (*/}
                {/*{payload && payload.role === "ADMIN" ? (*/}
                {isLoggedIn && payload && payload.role === "ADMIN" ? (
                    <div>
                        <Link to="/Admin">
                            <button>관리자</button>
                        </Link>
                        <button onClick={logoutAction}>로그아웃</button>
                    </div>
                    // ) : payload ? (
                ) : isLoggedIn ? (
                    <div>
                        <Link to={'/Cart'}>
                            <button>장바구니</button>
                        </Link>

                        <Link to={'/MyPage'}>
                            <button>마이페이지</button>
                        </Link>
                        <button onClick={logoutAction}>로그아웃</button>
                    </div>
                ) : (
                    <Link to={'/Login'}>
                        <button>로그인</button>
                    </Link>
                )}
            </div>
        </div>

    );
}

export default Header;

function base64DecodeUnicode(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}