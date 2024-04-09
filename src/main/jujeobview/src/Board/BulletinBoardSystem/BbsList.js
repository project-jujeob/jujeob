import "../../MainPage.css";
import "../BbsStyle/bbsList.css";
import Header from "../../common/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from '../../common/Pagination';
import parse from 'html-react-parser';

function BbsList(props) {
    const parse = require('html-react-parser').default;
    const [boardsList, setBoardsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`board/boardData?page=${page}&limit=12`) // 페이지당 12개의 데이터 요청
            .then((response) => {
                const newBoards = response.data;
                setBoardsList((prevBoardsList) => [...prevBoardsList, ...newBoards]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
                setLoading(false);
            });
    };

    const itemsPerPage = 12;
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
                    <div className="SlideArea">이곳은 슬라이드</div>
                    <div className="BestPostArea">이곳은 베스트글입니다.</div>
                </div>

                <div className="NavContainer">
                    <div className="CategoriesNavContainer">
                        <div className="Categories">
                            <div className="Category">자유게시판</div>
                            <div className="Category">주류게시판</div>
                            <Link to={"/RandomCat"}>
                            <div className="Category">모임게시판</div>
                            </Link>
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
                            <button className="DetailNavButton">카테고리</button>
                            <button className="DetailNavButton">정렬</button>
                            <button className="DetailNavButton">내 북마크 보기</button>
                        </div>

                        <div className="DetailNavSearchArea">
                            {/*<img src={BoardImg} alt="돋보기"></img>*/}
                            <input type="text" placeholder="검색어를 입력하세요"></input>
                        </div>
                    </div>
                </div>


                <div className="PostContainer">
                    {currentItems.map((board, index) => (
                        <div className="bbsPost bbsPostItem" key={index}>
                            <div className="bbsPostBackground">
                                <div className="PostDetailTop">
                                    <p>{board.boardId}</p>
                                    <p> {board.createDate}</p>
                                    <h3>{board.boardTitle} </h3> <br />
                                </div>
                                <div className="PostDetailBottom">
                                    <p>작성자:

                                        {parse(
                                            board.boardContent
                                        )}
                                    </p>


                                    <div className="PostDetailBottomButton">
                                        <button className="LikeButton">♡</button>
                                        <button className="ReplyComment">댓글</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/*{loading && <div>Loading...</div>}*/}
                </div>
                <Pagination
                    totalItems={boardsList.length}
                    itemsPerPage={itemsPerPage}
                    pageCount={5}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    start={indexOfFirstItem + 1} // 현재 페이지의 첫 번째 아이템 인덱스를 전달합니다.
                />
            </div>
        </div>
    );
}

export default BbsList;