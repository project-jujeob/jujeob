import "../../MainPage.css"
import '../BbsStyle/bbsList.css';
import Header from "../../common/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function BbsList(props) {
    const [boardsList, setBoardsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('api/boardData')
            .then((response)=>{
                setBoardsList(response.data);
            })
            .catch((error)=>{
                console.error('데이터 가져오기 실패:', error);
            })
    }, []);
    const itemsPerPage = 9;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = boardsList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <Header />
            <div className="BbsListContainer">
                <div className="SlideAndBestPost">
                    <div className="SlideArea">
                        이곳은 슬라이드
                    </div>
                    <div className="BestPostArea">
                        이곳은 베스트글입니다.
                    </div>
                </div>

                <div className="NavContainer">
                    <div className="CategoriesNavContainer">
                        <div className="Categories">
                                <div className="Category">자유게시판</div>
                                <div className="Category">주류게시판</div>
                                <div className="Category">모임게시판</div>
                        </div>
                        <div className="CategoryNewPost">
                            <Link to={"/BbsWrite"}>
                                <a>글 작성하기</a>
                            </Link>
                        </div>
                    </div>
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
                    {currentItems.map((board) => (
                        <div className="bbsPost bbsPostItem" key={board.id}>
                            <div className="bbsPostBackground">
                                <div className="PostDetailTop">
                                    <p> {board.createDate}</p>
                                    <h3>{board.boardTitle} </h3> <br/>
                                </div>
                                <div className="PostDetailBottom">
                                    <p>작성자: {board.boardContent}</p>
                                    <div className="PostDetailBottomButton">
                                        <button className="LikeButton">♡</button>
                                        <button className="ReplyComment">댓글</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BbsList;