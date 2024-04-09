import './MainPage.css';
import {Link} from "react-router-dom";
import loginMemberData from '../src/member/Login';
import {useContext} from "react";
// import {AuthContext} from "./member/Context";
function MainPage() {
    // const { loginMemberData } = useContext(AuthContext);

    // 다른 페이지에서 로그인 정보 가져오기
    const loginMemberData = JSON.parse(localStorage.getItem('loginMemberData'));


    console.log(loginMemberData);

    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <Link to={"/ProductList"}>
                            <button>술 정보</button>
                        </Link>
                        <Link to={"/BbsList"}>
                             <button>커뮤니티</button>
                        </Link>
                        <button>공지사항</button>
                        <button>장바구니</button>

                        {loginMemberData != null ?[
                            <Link to={"/MyPage"}>
                                <button>마이페이지</button>
                            </Link>,
                            <Link to={"/Logout"}>
                                <button>로그아웃</button>
                            </Link>
                        ] : (
                            <Link to={"/Login"}>
                                <button>로그인</button>
                            </Link>
                        )}


                    </div>
                </div>
                <div className="MainContent">
                    <div className="MainTitle">
                        <h1>JU JEOB</h1>
                    </div>
                    <div className="MainBtn">
                        <Link to={"/ProductList"} >
                            <button>오늘의 추천 주류</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;