import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./member/Login";
import Register from "./member/Register";
import RegisterComplete from "./member/RegisterComplete";
import MainPage from "./MainPage";
<<<<<<< HEAD
import ProductListShow from "./product/ProductListShow";
import ProductItemDetail from "./product/ProductItemDetail";
=======
import React from "react";
>>>>>>> c3400f6a5ec6259a363c87f8af8ac670d1db45ce


function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}/>
                {/*<Route path='/ProudctList/:productNo' component={ProductListShow} />*/}
                <Route path='/ProuductItemDetail/:productNo' element={<ProductItemDetail /> } />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/RegisterComplete' element={<RegisterComplete />} />
            </Routes>
        </div>
    );
}

export default App;