
import "../../MainPage.css";
import "../BbsStyle/bbsListItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import BbsDetailModal from "./BbsDetail";
function BbsListItem() {
    const [boardsList, setBoardsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBoardsList, setFilteredBoardsList] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        filterBoardsList();
    }, [searchTerm, boardsList]);

    const fetchData = () => {
        axios
            .get(`board/boardData?page=${page}&limit=12`)
            .then((response) => {
                const newBoards = response.data;
                setBoardsList((prevBoardsList) => [...prevBoardsList, ...newBoards]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
                setIsLoading(false);
            });
    };


    const filterBoardsList = () => {
        const filteredList = boardsList.filter(board =>
            board.boardTitle && board.boardTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBoardsList(filteredList);
        setCurrentPage(1);
    };

    const itemsPerPage = 12;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const openModal = (boardId) => {
        console.log(boardId);
        setSelectedBoardId(boardId);
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setSelectedBoardId(null);
        setIsModalOpen(false); // 모달 닫기
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoardsList.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div>
            <div className="DetailNavSearchArea">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isLoading && <div>Loading...</div>}
            {filteredBoardsList.length === 0 && !isLoading && <div>검색 결과가 없습니다.</div>}
            {/*필터링 된 데이터의 길이가 0이거나 로딩 중이 아닐 경우에 검색 결과가 없음 텍스트를 반환 출력했슴다유*/}
            <div className="PostContainer">
                {currentItems.map((board, index) => (
                    <div className="bbsPost bbsPostItem" key={index}>
                        {/*<Link to={`/BbsDetail/${board.boardId}`}>*/}
                            <div className="bbsPostBackground" onClick={() => openModal(board.boardId)}>
                                <div className="PostDetailTop">
                                    <p>{board.boardId}</p>
                                    <p>{board.createDate}</p>
                                    <h3>{board.boardTitle}</h3>
                                </div>
                                <div className="PostDetailBottom">
                                    <div className="PostDetailBottomAuthor">작성자: 아직 구현 X</div>
                                    <div className="PostDetailBottomButton">
                                        <button className="LikeButton">♡</button>
                                        <button className="ReplyComment">댓글</button>
                                    </div>
                                </div>
                            </div>
                        {/*</Link>*/}
                    </div>
                ))}
            </div>
            <Pagination
                totalItems={filteredBoardsList.length}
                itemsPerPage={itemsPerPage}
                pageCount={5}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                start={indexOfFirstItem + 1}
            />
            <BbsDetailModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                boardId={selectedBoardId}
            />
        </div>
    );
}

export default BbsListItem;
