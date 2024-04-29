import './MainPage.css';
import { Link, useNavigate } from "react-router-dom"; // useHistory 추가
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // useHistory 훅 추가

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

                window.location.reload();

                // 이전 페이지로 이동
                navigate(-1)
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <Link to="/ProductList">
                            <button>술 정보</button>
                        </Link>
                        <button>커뮤니티</button>
                        <button>공지사항</button>
                        <Link to={"/Cart"}>
                            <button>장바구니</button>
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/MyPage">
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