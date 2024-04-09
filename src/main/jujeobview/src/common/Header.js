import CommonLogo from '../img/CommonLogo.png';
import {Link} from "react-router-dom";
import './Header.css';
import loginMemberData from "../member/Login";
import {useContext} from "react";
// import {AuthContext} from "../member/Context";

function Header() {

    // 다른 페이지에서 로그인 정보 가져오기
    const loginMemberData = JSON.parse(localStorage.getItem('loginMemberData'));

    return (
        <div className="Header">
            <div className="HeaderLogo">
                <Link className="HeaderLink" to={"/"}>
                    <img src={CommonLogo} alt="헤더로고"/>
                    <p>JU JEOB</p>
                </Link>
            </div>
            <div className="HeaderMenu">
                <Link to={"/ProductList"}>
                    <button>술 정보</button>
                </Link>
                <button>커뮤니티</button>
                <button>공지사항</button> 
                <Link to={"/Cart"}>
                    <button>장바구니</button>
                </Link>
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
    )
}

export default Header;