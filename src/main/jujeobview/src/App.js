import './App.css';
import MainImg from './img/MainImg.jpg';
import MainLogo from './img/MainLogo.png';
import Footer from "./common/Footer";

function App() {
    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHeader">
                    <div className="MainMenu">
                        <button>술 정보</button>
                        <button>커뮤니티</button>
                        <button>공지사항</button>
                        <button>장바구니</button>
                        <button>로그인/회원가입</button>
                    </div>
                </div>
                <div className="MainContent">
                    <div className="MainTitle">
                        <h1>JU JEOB</h1>
                    </div>
                    <div className="MainBtn">
                        <button>오늘의 추천 주류</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
