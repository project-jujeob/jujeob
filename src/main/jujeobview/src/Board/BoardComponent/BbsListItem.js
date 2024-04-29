
import "../../MainPage.css";
import "../BbsStyle/bbsListItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../common/Pagination";
import BbsDetailModal from "../BoardModal/BbsDetail";
import {useAuth} from "../../member/Context";
import Loading from "../Comment/Loading";
import { FaRegComment } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import DateAndTime from "./DateAndTime";
function BbsListItem() {
    const { payload } = useAuth();
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
        const delaySearch = setTimeout(() => {
            filterBoardsList();
        }, 90);
        return () => clearTimeout(delaySearch);
    }, [searchTerm, boardsList]);

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get(`board/boardData?page=${page}&limit=12`)
            .then((response) => {
                const newBoards = response.data.filter(board => board.isDeleted === 0);
                newBoards.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
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
        if (!payload) {
            alert("로그인된 유저만 접근 가능합니다.");
            return;
        }
        try{
            setSelectedBoardId(boardId);
            setIsModalOpen(true);
        } catch (error) {
            console.log("로그인 데이터 오류", error)
        }

    };

    const closeModal = () => {
        setSelectedBoardId(null);
        setIsModalOpen(false);
    };

    const handleBoardClick = (boardId) => {
        if (!payload) {
            alert("로그인된 유저만 접근 가능합니다.");
            return;
        }

        const userId = payload.memberNo; // 사용자의 식별자를 가져옴
        const lastVisitTime = localStorage.getItem(`lastVisit_${userId}_${boardId}`);
        const currentTime = new Date().getTime();

        if (!lastVisitTime || currentTime - parseInt(lastVisitTime) > 12 * 60 * 60 * 1000 ) {
            axios.post(`board/IncreaseViews/${boardId}`)
                .then((response) => {
                    console.log("조회수 증가 완료");
                    localStorage.setItem(`lastVisit_${userId}_${boardId}`, currentTime.toString());
                })
                .catch((error) => {
                    console.error("조회수 증가 실패:", error);
                });
        } else {
            console.log("이미 조회한 게시물입니다.");
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoardsList.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div>
            <div className="DetailNavSearchArea">
                <input
                    type="text"
                    placeholder="검색할 제목을 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isLoading && <Loading />}
            {filteredBoardsList.length === 0 && !isLoading && <div>검색 결과가 없습니다.</div>}
            {/*필터링 된 데이터의 길이가 0이거나 로딩 중이 아닐 경우에 검색 결과가 없음 텍스트를 반환 출력했슴다유*/}
            <div className="PostContainer">
                {currentItems.map((board, index) => (
                    <div className="bbsPost bbsPostItem" onClick={()=>handleBoardClick(board.boardId)} key={index}>
                        {/*<Link to={`/BbsDetail/${board.boardId}`}>*/}
                        <div className="bbsPostBackground" onClick={() => openModal(board.boardId)}>
                            <DateAndTime createDate={board.createDate}/>
                            <div className="PostDetailTop">
                                <h3>{board.boardTitle}</h3>
                            </div>
                            <div className="PostDetailBottom">
                                <div className="PostDetailBottomItem PostDetailBottomAuthor">{board.memNickname}</div>
                                <div className="PostDetailBottomItem PostDetailBottomCV">
                                    <div className="PostDetailBottomCVItem ReplyComment">
                                        <FaRegComment />
                                        <p>{board.commentCount}</p>
                                    </div>
                                    <div className="PostDetailBottomCVItem Views">
                                        <FiEye />
                                        <p>{board.boardViews}</p>
                                        </div>
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
                onRequestOpen={openModal}
                onRequestClose={closeModal}
                boardId={selectedBoardId}
            />
        </div>
    );
}

export default BbsListItem;
