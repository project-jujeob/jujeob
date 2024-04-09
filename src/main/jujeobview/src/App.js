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
<<<<<<< HEAD
import ProductItemDetail from "./product/ProductItemDetail";
=======
import MainPage from "./MainPage"; 
>>>>>>> 643ef60bb207f48117b88b441ee1450703febe3b
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
                <Route path='/MyPage' element={<MyPage />} />
                <Route path='/Logout' element={<Logout />} />
                <Route path='/Cart' element={<Cart/>} />
            </Routes>
        </div>
    );
}

export default App;