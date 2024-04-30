import CommonLogo from '../img/CommonLogo.png';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Header.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../user/Context";

function Header() {
    const { payload, setAuthPayload } = useAuth(); // Context에서 payload 및 setAuthPayload 가져오기
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigation = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 로그인 상태 확인
    const checkLoginStatus = () => {

        // 엑세스 토큰 또는 리프레시 토큰의 존재 여부로 로그인 상태 결정
        setIsLoggedIn(!!accessToken || !!refreshToken);

        if (accessToken) {
            try {
                const [, payloadBase64] = accessToken.split(".");
                const payloadString = base64DecodeUnicode(payloadBase64);
                const newPayload = JSON.parse(payloadString);
                setAuthPayload(newPayload);
            } catch (error) {
                console.error('Error parsing access token:', error);
            }
        }
    };

    // 로그아웃 처리
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
                setAuthPayload(null);
                setIsLoggedIn(false);
                // 현재 페이지가 "/MyPage"일 경우 홈으로 리디렉션
                if (location.pathname === "/MyPage" || location.pathname === "/Cart" || location.pathname === "/CustomerOrder") {
                    navigation('/');
                } else {
                    window.location.reload();
                }

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
    // URL-safe Base64 인코딩을 일반 Base64로 변환
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    // Base64 문자열의 길이가 4의 배수가 되도록 패딩을 추가
    const padding = 4 - (base64.length % 4);
    if (padding !== 4) {
        base64 += '='.repeat(padding);
    }

    // 디코드된 데이터를 UTF-8 문자열로 변환
    const bytes = atob(base64);
    return decodeURIComponent(bytes.split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
