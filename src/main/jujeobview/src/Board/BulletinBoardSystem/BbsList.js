import "../../MainPage.css"
import '../BbsStyle/bbsList.css';
import React, { useState, useEffect } from 'react';
import Header from "../../common/Header";
import BoardImg from "../BoardImg/reading-glasses.png"
function BbsList() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch('/api/boards') // 또는 axios.get('/api/boards') 등
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <Header />
            <div className="SubContainer">
                <div className="SlideAndBestPost">
                    <div className="SlideArea">
                        이곳은 슬라이드
                    </div>
                    <div className="BestPostArea">
                        이곳은 베스트글입니다.
                    </div>
                </div>
                <div className="NavContainer">
                    <section className="Categories">
                        <div className="Category">
                            {/*임의*/}
                            자유게시판
                        </div>
                        <div className="Category">
                            {/*임의*/}
                            주류게시판
                        </div>
                        <div className="Category">
                            {/*임의*/}
                            주류게시판
                        </div>
                    </section>
                    <div className="DetailNavContainer">
                        <div className="DetailNavButtonArea">
                        {/*   구조가 애매해서 스타일만 줄 것임*/}
                        <button className="DetailNavButton">
                            카테고리
                        </button>
                        <button className="DetailNavButton">
                            정렬
                        </button>
                        <button className="DetailNavButton">
                            내 북마크 보기
                        </button>
                        </div>
                        <div className="DetailNavSearchArea">
                        {/*<img src={BoardImg} alt="돋보기"></img>*/}
                        <input type="text" placeholder="검색어를 입력하세요"></input>
                        </div>
                    </div>
                </div>

                <div className="PostContainer">
                <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                    <div className="bbsPost bbsPostItem"></div>
                </div>
            </div>
        </div>
    );
}

export default BbsList;
