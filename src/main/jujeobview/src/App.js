import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import ProductList from "./product/ProductList";
import Login from "./user/Login";
import AdultVerification from "./user/AdultVerification";
import Register from "./user/Register";
import RegisterComplete from "./user/RegisterComplete";
import MyPage from "./mypage/MyPage";
import BbsList from "./Board/BulletinBoardSystem/BbsList";
import MainPage from "./MainPage";
import ProductItemDetail from "./product/Detail/ProductItemDetail";
import React from "react";
import CartPage from "./product/Cart/CartPage";
import ReviewWrite from "./product/Detail/review/ReviewWrite";
import {PaginationProvider} from "./common/PaginationContext";
import Pagination from "./common/Pagination";
import CustomerOrder from "./product/Cart/CustomerOrder";
import Admin from "./admin/Admin";
import UserInfo from "./admin/UserInfo";
import ProductRegistration from "./admin/ProductRegistration";
import Announcement from "./Announcement/Announcement";
import CustomerOrderComplete from "./product/Cart/CustomerOrderComplete";
import ProductEdit from "./admin/ProductEdit";
import Info from "./Info/Info";

import CustomerPayment from "./product/Cart/CustomerPayment"

function App() {

    return (
        <PaginationProvider>
            <div>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/Info" element={<Info />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/UserInfo' element={<UserInfo />} />
                    <Route path='/ProductRegistration' element={<ProductRegistration />} />
                    <Route path='/Announcement' element={<Announcement />} />
                    <Route path='/ProductEdit/:productNo' element={<ProductEdit />} />
                    <Route path='/ProductList' element={<ProductList />}/>
                    <Route path='/ProductItemDetail/:productNo' element={<ProductItemDetail /> } />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/AdultVerification' element={<AdultVerification />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/RegisterComplete' element={<RegisterComplete />} />
                    <Route path='/BbsList' element={<BbsList />} />
                    <Route path='/MyPage' element={<MyPage />} />
                    <Route path='/Cart' element={<CartPage/>} />
                    <Route path='/ReviewWrite/:productNo' element={<ReviewWrite/>} />
                    <Route path='/Pagination' element={<Pagination />} />
                    <Route path='/CustomerOrder' element={<CustomerOrder />} />
                    <Route path='/CustomerPayment' element={<CustomerPayment />} />
                    <Route path='/CustomerOrderComplete' element={<CustomerOrderComplete />} />
                </Routes>
            </div>
        </PaginationProvider>
    );
}

export default App;