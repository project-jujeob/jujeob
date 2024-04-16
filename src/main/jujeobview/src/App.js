import './App.css';
import {Route, Routes} from "react-router-dom";
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
import React from "react";
import CartPage from "./product/Cart/CartPage";
import ReviewWrite from "./product/Detail/review/ReviewWrite";


function App() {

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
                <Route path='/Logout' element={<Logout />} />
                <Route path='/Cart' element={<CartPage/>} />
                <Route path='/ReviewWrite/:productNo' element={<ReviewWrite/>} />
                <Route path='/Cart' element={<Cart/>} />
            </Routes>
        </div>
    );
}

export default App;