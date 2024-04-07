import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MainPage from "./MainPage";
import ProductItemDetail from "./product/ProductItemDetail";
import React from "react";
import BbsList from "./Board/BulletinBoardSystem/BbsList";
import BbsWrite from "./Board/BulletinBoardSystem/BbsWrite";


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
                <Route path='/BbsList' element={<BbsList />} />
                <Route path='/BbsWrite' element={<BbsWrite />}/>
            </Routes>
        </div>
    );
}

export default App;