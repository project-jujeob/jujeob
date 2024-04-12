import "../../MainPage.css";
import "../BbsStyle/bbsListItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";

function BbsListItem(props) {
    const [boardsList, setBoardsList] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = () => {
        axios
            .get(`board/boardData?page=${page}&limit=12`) // 페이지당 12개의 데이터 요청
            .then((response) => {
                const newBoards = response.data;
                setBoardsList((prevBoardsList) => [...prevBoardsList, ...newBoards]);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
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
            <div className="PostContainer" >
                {currentItems.map((board, index) => (
                    <div className="bbsPost bbsPostItem" key={index} >
                        <Link to={`/BbsDetail/${board.boardId}`}>
                            <div className="bbsPostBackground">
                                <div className="PostDetailTop">
                                    <p>{board.boardId}</p>
                                    <p> {board.createDate}</p>
                                    <h3>{board.boardTitle} </h3> <br />
                                </div>
                                <div className="PostDetailBottom">
                                    <div className="PostDetailBottomAuthor">작성자: 아직 구현 X</div>
                                    <div className="PostDetailBottomButton">
                                        <button className="LikeButton">♡</button>
                                        <button className="ReplyComment">댓글</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
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
    );
}

export default BbsListItem;