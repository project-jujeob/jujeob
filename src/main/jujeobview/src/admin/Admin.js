import React, {useState} from 'react';
import Header from "../common/Header";
import {Link, useNavigate} from "react-router-dom";
import UserInfo from "./UserInfo";
import ProductRegistration from "./ProductRegistration";

const Admin = () => {
    const [selectedTab, setSelectedTab] = useState('');
    const navigate = useNavigate();

    const tabTitles = {
        userinfo: "주접 회원 목록",
        productRegistration: "🥂🍺상품 등록 페이지입니다🍷🍸"
    };

    const renderComponent = () => {
        switch (selectedTab) {
            case 'userinfo':
                return <UserInfo />;
            case 'productRegistration':
                return <ProductRegistration />; 
            // case 'orderList':
            //     return <OrderHistory />;
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
                            className={`AdminWorkBtn3 ${selectedTab === 'orderList' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('orderList')}>
                            주문 확인
                        </button>
                        <button
                            className={`AdminWorkBtn4 ${selectedTab === 'announcementWrite' ? 'selected' : ''}`}
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