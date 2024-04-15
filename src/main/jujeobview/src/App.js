import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import RegisterAdult from "./member/RegisterAdult";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import BbsList from "./Board/BulletinBoardSystem/BbsList";
import BbsWrite from "./Board/BulletinBoardSystem/BbsWrite";
import MyPage from "./member/MyPage";
import MainPage from "./MainPage";
import Logout from "./member/Logout";
// import {AuthProvider} from "./member/Context";
import ProductItemDetail from "./product/Detail/ProductItemDetail";
import React, {useEffect, useState} from "react";
import Cart from "./product/Cart/Cart";


function App() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
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
                <Route path='/Logout' element={<Logout />} />
                <Route path='/Cart' element={<Cart/>} />
            </Routes>
        </div>
    );
}

export default App;