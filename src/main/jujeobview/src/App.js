import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MainPage from "./MainPage";
import ProductItemDetail from "./product/ProductItemDetail";
import React from "react";
import Logout from "./member/Logout";
import MyPage from "./mypage/MyPage";
// import {AuthProvider} from "./member/Context";


function App() {

    return (
        <div>

            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path='/ProductList' element={<ProductList />}/>
                <Route path='/ProuductItemDetail/:productNo' element={<ProductItemDetail /> } />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/RegisterComplete' element={<RegisterComplete />} />
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/Logout' element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;