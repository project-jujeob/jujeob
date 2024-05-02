import React, {useState} from 'react';
import Header from "../common/Header";
import {Link, useNavigate} from "react-router-dom";
import UserInfo from "./UserInfo";
import ProductRegistration from "./ProductRegistration";
import ProductManagement from "./ProductManagement";
import OrderListByAdmin from "./OrderListByAdmin";

const Admin = () => {
    const [selectedTab, setSelectedTab] = useState('');
    const navigate = useNavigate();

    const tabTitles = {
        userinfo: "주접 회원 목록",
        productRegistration: "상품 등록",
        productManagement: "상품 관리",
        orderListByAdmin: "주문내역 확인"
    };

    const renderComponent = () => {
        switch (selectedTab) {
            case 'userinfo':
                return <UserInfo />;
            case 'productRegistration':
                return <ProductRegistration />;
            case 'productManagement':
                return <ProductManagement />;
            case 'orderListByAdmin':
                return <OrderListByAdmin />;
        }
    };

    const getHeaderTitle = () => {
        return tabTitles[selectedTab] || "관리자 페이지입니다 !";
    };

    const handleNavigation = (tab) => {
        if (tab === 'announcementWrite') {
            navigate('/Announcement');  // '/Announcement' 경로로 이동
        } else {
            setSelectedTab(tab);
        }
    };

    return (
        <>
            <Header />
            <div className="AdminContainer">
                <div className="AdminWorkHeader"><h2>{getHeaderTitle()}</h2></div>
                <div className="AdminWork">
                    <div className="AdminWorkBtns">
                        <button
                            className={`AdminWorkBtn1 ${selectedTab === 'userinfo' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('userinfo')}>
                            회원 관리
                        </button>
                        <button
                            className={`AdminWorkBtn2 ${selectedTab === 'productRegistration' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('productRegistration')}>
                            상품 등록
                        </button>
                        <button
                            className={`AdminWorkBtn3 ${selectedTab === 'productManagement' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('productManagement')}>
                            상품 관리
                        </button>
                        <button
                            className={`AdminWorkBtn4 ${selectedTab === 'orderListByAdmin' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('orderListByAdmin')}>
                            주문 내역 확인
                        </button>
                        <button
                            className={`AdminWorkBtn5 ${selectedTab === 'announcementWrite' ? 'selected' : ''}`}
                            onClick={() => handleNavigation('announcementWrite')}>
                            공지 관리
                        </button>
                    </div>

                    <div className="AdminWorkShow">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;