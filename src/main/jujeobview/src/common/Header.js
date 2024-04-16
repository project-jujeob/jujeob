import CommonLogo from '../img/CommonLogo.png';
import {Link, useLocation} from "react-router-dom";
import './Header.css';
import {useEffect} from "react";
import axios from "axios";
import {useAuth} from "../member/Context";

function Header() {
    const { payload, setAuthPayload } = useAuth(); // Context에서 payload 및 setAuthPayload 가져오기

    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const checkLoginStatus = () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token != null) {
            const [, payloadBase64] = token.split('.');
            const payloadString = atob(payloadBase64);
            const newPayload = JSON.parse(payloadString);
            setAuthPayload(newPayload); // payload를 Context에 설정
        }
    };

    const logoutAction = () => {
        axios
            .delete('/api/logout')
            .then((response) => {
                localStorage.removeItem('token');
                setAuthPayload(null); // 로그아웃 시 payload를 null로 설정
                console.log('Logout successful');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="Header">
            <div className="HeaderLogo">
                <Link className="HeaderLink" to={'/'}>
                    <img src={CommonLogo} alt="헤더로고" />
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
                <button>공지사항</button>
                <Link to={'/Cart'}>
                    <button>장바구니</button>
                </Link>
                {payload ? (
                    <>
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