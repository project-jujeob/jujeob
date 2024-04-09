import CommonLogo from '../img/CommonLogo.png';
import {Link} from "react-router-dom";
import './Header.css';

function Header() {
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
                <button>로그인/회원가입</button>
            </div>
        </div>
    )
}

export default Header;