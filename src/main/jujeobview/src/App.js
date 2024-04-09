import './App.css';
import React from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import MainPage from "./MainPage";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import RegisterAdult from "./member/RegisterAdult";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MyPage from "./member/MyPage";
import ProductItemDetail from "./product/ProductItemDetail";
import Logout from "./member/Logout";
// import {AuthProvider} from "./member/Context";


function App() {

    return (
        <div>

            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path='/ProductList' element={<ProductList />}/>
                <Route path='/ProuductItemDetail/:productNo' element={<ProductItemDetail /> } />
                <Route path='/Login' element={<Login />} />
                <Route path='/RegisterAdult' element={<RegisterAdult />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/RegisterComplete' element={<RegisterComplete />} />
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/Logout' element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;