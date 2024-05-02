import './MyPage.css';
import Header from "../common/Header";
import {useEffect, useState} from "react";
import Profile from "./Profile";
import OrderDelivery from "./OrderDelivery";
import PurchaseReservation from "./PurchaseReservation";
import DibsList from "./DibsList";
import ReviewHistory from "./ReviewHistory";
import MyPosts from "./MyPosts";


function MyPage() {

    const [subTitleText, setSubTitleText] = useState("주문 및 배송")

    const subTitleChange = (title) => {
        setSubTitleText(title);
        console.log(`${title} 섹션이 활성화됩니다.`);
    };

    const renderSubPage = () => {

        switch (subTitleText) {
            case "주문 및 배송":
                return <OrderDelivery />
            case "구매 및 예약":
                return <PurchaseReservation />
            case "찜 목록":
                return <DibsList />
            case "리뷰 내역":
                return <ReviewHistory />
            case "내가 쓴 게시글":
                return <MyPosts />
            case "회원 정보":
            case "회원 정보 수정":
                return <Profile subTitleChange={subTitleChange} subTitleText={subTitleText} />
            default: return null;
        }
    }

    return (
        <div>
            <Header/>
            <div className={"MyPageForm"}>
                <div className={"MyPageTitle"}>
                    <h1>MyPage</h1>
                    <div className={"MyPageSideBar"}>
                        <h3 onClick={() => subTitleChange("주문 및 배송")}>주문 및 배송</h3>
                        <h3 onClick={() => subTitleChange("구매 및 예약")}>구매 및 예약</h3>
                        <h3 onClick={() => subTitleChange("찜 목록")}>찜 목록</h3>
                        <h3 onClick={() => subTitleChange("리뷰 내역")}>리뷰 내역</h3>
                        <h3 onClick={() => subTitleChange("내가 쓴 게시글")}>내가 쓴 게시글</h3>
                        <h3 onClick={() => subTitleChange("회원 정보")}>회원 정보</h3>
                    </div>
                </div>

                <div className={"MyPageSubTitle"}>
                    <h1>{subTitleText}</h1>
                    <div className={"SubTitleDetail"}>
                        {renderSubPage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;