import CommonLogo from '../img/CommonLogo.png';
import {Link} from "react-router-dom";
import './Header.css';
import loginMemberData from "../member/Login";

function Header() {
    return (
        <div className="Header">
            <div className="HeaderLogo">
                <Link className="HeaderLink" to={"/"}>
                    <img src={CommonLogo}/>
                    <p>JU JEOB</p>
                </Link>
            </div>
            <div className="HeaderMenu">
                <Link to={"/ProductList"}>
                    <button>술 정보</button>
                </Link>
                <button>커뮤니티</button>
                <button>공지사항</button>
                <button>장바구니</button>
                {loginMemberData != null ? (
                    <Link to={"/MyPage"}>
                        <button>마이페이지</button>
                    </Link>
                ) : (
                    <Link to={"/Login"}>
                        <button>로그인</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header;