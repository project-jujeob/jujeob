import './MainPage.css';
import {Link} from "react-router-dom";

function MainPage() {
    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <Link to={"/ProductList"} >
                            <button>술 정보</button>
                        </Link>
                        <Link to={"/BbsList"}>
                             <button>커뮤니티</button>
                        </Link>
                        <button>공지사항</button>
                        <button>로그인/회원가입</button>
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