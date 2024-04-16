import CommonLogo from '../img/CommonLogo.png';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Header.css';
import loginMemberData from "../member/Login";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
// import {AuthContext} from "../member/Context";

function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    // location 객체에서 state 속성을 추출하고, 만약 state 속성이 존재하지 않으면 기본값으로 { from: { pathname: "/" } }
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(from)

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 로그인 상태 확인
    const checkLoginStatus = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        setIsLoggedIn(token != null);

        if (token != null) {
            const [, payloadBase64] = token.split(".");
            const payloadString = atob(payloadBase64);
            const payload = JSON.parse(payloadString);
            console.log(payload);
        }
    };

    // 로그아웃 처리
    const logoutAction = () => {
        // 서버에 로그아웃 요청을 보냅니다.
        axios.delete('/api/logout')
            .then(response => {
                // 로그아웃이 성공하면 로컬 스토리지에 저장된 토큰을 삭제합니다.
                localStorage.removeItem('token');
                // 로그인 상태 업데이트
                setIsLoggedIn(false);
                console.log('Logout successful');

                // 이전 페이지로 이동
                // navigate(from)
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="Header">
            <div className="HeaderLogo">
                <Link className="HeaderLink" to={"/"} key={"headerLink"}>
                    <img src={CommonLogo} alt="헤더로고"/>
                    <p>JU JEOB</p>
                </Link>
            </div>
            <div className="HeaderMenu">
                <Link to={"/ProductList"}  key={"productlist"}>
                    <button>술 정보</button>
                </Link>
                <Link to={"/BbsList"} key={"BbsList"}>
                  <button>커뮤니티</button>
                </Link>
                <button>공지사항</button>
                <Link to={"/Cart"} key={"cart"}>
                    <button>장바구니</button>
                </Link>
                {isLoggedIn ?[
                    <Link to={"/MyPage"} key={"mypage"}>
                        <button>마이페이지</button>
                    </Link>,

                    <button key={"logout"} onClick={logoutAction}>로그아웃</button>

                ] : (
                    <Link to={"/Login"} key={"login"}>
                        <button>로그인</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header;