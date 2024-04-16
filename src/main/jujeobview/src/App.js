import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import RegisterAdult from "./member/RegisterAdult";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MyPage from "./mypage/MyPage";
import BbsList from "./Board/BulletinBoardSystem/BbsList";
import BbsWrite from "./Board/BulletinBoardSystem/BbsWrite";
import MainPage from "./MainPage";

// import {AuthProvider} from "./member/Context";
import ProductItemDetail from "./product/Detail/ProductItemDetail";
import React, {useEffect, useState} from "react";
import CartPage from "./product/Cart/CartPage";
import ReviewWrite from "./product/Detail/review/ReviewWrite";
import axios from "axios";


function App({payload}) {

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

                // 이전 페이지로 이동
                navigate(-1)
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}/>
                <Route path='/ProductItemDetail/:productNo' element={<ProductItemDetail /> } />
                <Route path='/Login' element={<Login />} />
                <Route path='/RegisterAdult' element={<RegisterAdult />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/RegisterComplete' element={<RegisterComplete />} />
                <Route path='/BbsList' element={<BbsList />} />
                <Route path='/BbsWrite' element={<BbsWrite />}/>
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/Cart' element={<CartPage/>} />
                <Route path='/ReviewWrite/:productNo' element={<ReviewWrite/>} />
            </Routes>
        </div>
    );
}

export default App;