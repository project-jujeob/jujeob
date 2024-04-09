import './MyPage.css';
import Header from "../common/Header";
import {useState} from "react";
import Profile from "./Profile";

function MyPage () {

    // const { loginMemberData } = useContext(AuthContext);

    const [showProfile, setShowProfile] = useState(false);
    const [subTitleText, setSubTitleText] = useState("SubTitle");

    const changeSubTitle = (e) => {
        setSubTitleText(e)
        setShowProfile(e === "회원 정보 수정")
    }


    return (
        <div>
            <Header/>
            <div className={"MyPageForm"}>
                <div className={"MyPageTitle"}>
                    <h1>MyPage</h1>
                        <div className={"MyPageSideBar"}>
                            <div onClick={() => changeSubTitle("주문 및 배송")}>
                                <h3>주문 및 배송</h3>
                            </div>
                            <div onClick={() => changeSubTitle("구매 및 예약")}>
                                <h3>구매 및 예약</h3>
                            </div>
                            <div onClick={() => changeSubTitle("찜 목록")}>
                                <h3>찜 목록</h3>
                            </div>
                            <div onClick={() => changeSubTitle("리뷰 내역")}>
                                <h3>리뷰 내역</h3>
                            </div>
                            <div onClick={() => changeSubTitle("내가 쓴 게시글")}>
                                <h3>내가 쓴 게시글</h3>
                            </div>
                            <div onClick={() => changeSubTitle("회원 정보 수정")}>
                                <h3>회원 정보 수정</h3>
                            </div>
                        </div>
                </div>

                <div className={"MyPageSubTitle"}>
                    <h1>{subTitleText}</h1>
                        <div className={"SubTitleDetail"}>
                            {showProfile && <Profile />}
                        </div>
                </div>

            </div>
        </div>
    )
}


export default MyPage