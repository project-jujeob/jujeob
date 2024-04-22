import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import RegisterAdult from "./member/RegisterAdult";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MyPage from "./mypage/MyPage";
import BbsList from "./Board/BulletinBoardSystem/BbsList";
import MainPage from "./MainPage";

// import {AuthProvider} from "./member/Context";
import ProductItemDetail from "./product/Detail/ProductItemDetail";
import React, {useEffect, useState} from "react";
import CartPage from "./product/Cart/CartPage";
import ReviewWrite from "./product/Detail/review/ReviewWrite";
import axios from "axios";
import {PaginationProvider} from "./common/PaginationContext";
import Pagination from "./common/Pagination";
import CustomerOrder from "./product/Cart/CustomerOrder";


function App({}) {

    return (
        <PaginationProvider>
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
                    <Route path='/MyPage' element={<MyPage />} />
                    <Route path='/Cart' element={<CartPage/>} />
                    <Route path='/ReviewWrite/:productNo' element={<ReviewWrite/>} />
                    <Route path='/Pagination' element={<Pagination />} />
                    <Route path='/CustomerOrder' element={<CustomerOrder />} />
                </Routes>
            </div>
        </PaginationProvider>
    );
}

export default App;