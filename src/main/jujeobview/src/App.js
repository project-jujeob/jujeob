import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import Register from "./member/Register";
import MainPage from "./MainPage";
import React from "react";


function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}></Route>
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;