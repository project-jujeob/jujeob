import './MyPage.css';
import Header from "../common/Header";
import {useEffect, useState} from "react";
import Profile from "./Profile";
import OrderDelivery from "./OrderDelivery";
import PurchaseReservation from "./PurchaseReservation";
import DibsList from "./DibsList";
import ReviewHistory from "./ReviewHistory";
import MyPosts from "./MyPosts";
import PasswordCheck from './PasswordCheck';
import axios from "axios";


function MyPage() {
    // const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    // const [showPasswordCheck, setShowPasswordCheck] = useState(false)

    const [passwordVerified, setPasswordVerified] = useState(false)
    const [subTitleText, setSubTitleText] = useState("SubTitle")

    // useEffect(() => {
    //     let storedData = localStorage.getItem('loginMemberData');
    //     try {
    //         storedData = JSON.parse(storedData);
    //         console.log("로그인 성공한 회원 정보:", storedData);
    //         setLoginMemberData(storedData);
    //     } catch (error) {
    //         console.error('Parsing error on reading loginMemberData', error);
    //     }
    // }, []);


    // 서브메뉴 클릭시 회원정보수정만 비번검증하고 페이지 이동
    // const verifyPassword = (isVerified) => {
    //     setPasswordVerified(isVerified);
    //     if (isVerified) {
    //         setSubTitleText("회원 정보 수정"); // 비밀번호 검증 성공 시 서브 타이틀 변경
    //     } else {
    //         alert("MyPage.js : 비밀번호가 잘못되었습니다.");
    //     }
    // };

    // 서브메뉴 클릭시 회원정보수정만 비번검증하고 페이지 이동
    // const subTitleChange = (title) => {
    //     setSubTitleText(title)  //클릭시 제목이 먼저 바뀌게 하기
    //     if (title === "회원 정보 수정") {
    //         //setShowPasswordCheck(true)
    //         setPasswordVerified(false)
    //     } else {
    //         //setShowPasswordCheck(false)  // 다른 메뉴 클릭 시 비밀번호 입력 숨김
    //         setPasswordVerified(true)    // 다른 메뉴 클릭 시 비밀번호 입력 보여주기
    //     }
    // }

    // 회원정보 수정 클릭시 비번검증 안하고 바로 수정페이지로(임시)
    const subTitleChange = (title) => {
        setSubTitleText(title)  //클릭시 제목이 먼저 바뀌게 하기
        if (title) {
            //setShowPasswordCheck(true)
            setPasswordVerified(true)
        }
    }

    const renderSubPage = () => {
        if (!passwordVerified) return null;

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
                return <Profile />
            default: return null
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
                        {/*{subTitleText === "회원 정보 수정" && <PasswordCheck onSubmit={verifyPassword} />}*/}
                        {renderSubPage()}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default MyPage;