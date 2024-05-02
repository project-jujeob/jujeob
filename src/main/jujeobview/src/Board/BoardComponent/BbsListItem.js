import "../../MainPage.css";
import "../BbsStyle/bbsListItem.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../common/Pagination";
import BbsDetailModal from "../BoardModal/BbsDetail";
import { useAuth } from "../../user/Context";
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
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [showOptions, setShowOptions] = useState(false);

    console.log(payload);
    useEffect(() => {
        fetchData();
    }, [page, selectedCategory]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            filterBoardsList();
        }, 90);
        return () => clearTimeout(delaySearch);
    }, [searchTerm, boardsList, selectedCategory]);

    const fetchData = () => {
        setIsLoading(true);
        axios
            .get(`board/boardData?page=${page}&limit=12&category=${selectedCategory === "전체" ? "" : selectedCategory}`)
            .then((response) => {
                const newBoards = response.data.filter(board => board.isDeleted === 0);
                newBoards.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                setBoardsList(newBoards);
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
        try {
            setSelectedBoardId(boardId);
            setIsModalOpen(true);
        } catch (error) {
            console.log("로그인 데이터 오류", error)
        }
    };

    const closeModal = () => {
        setSelectedBoardId(null);
        setIsModalOpen(false);
        fetchData();
    };

    const handleBoardClick = (boardId) => {
        if (!payload) {
            alert("로그인된 유저만 접근 가능합니다.");
            return;
        }

        const userId = payload.userNo;
        const lastVisitTime = localStorage.getItem(`lastVisit_${userId}_${boardId}`);
        const currentTime = new Date().getTime();

        if (!lastVisitTime || currentTime - parseInt(lastVisitTime) > 12 * 60 * 60 * 1000) {
            axios.post(`board/IncreaseViews/${boardId}`)
                .then((response) => {
                    localStorage.setItem(`lastVisit_${userId}_${boardId}`, currentTime.toString());
                })
                .catch((error) => {
                });
        } else {
            console.log("이미 조회한 게시물입니다.");
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setShowOptions(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoardsList.slice(indexOfFirstItem, indexOfLastItem);
    const [hoveredImage, setHoveredImage] = useState(null);

    return (
        <div>
            <div className="SearchAndCategory">
                <div className="DetailNavSearchArea">
                    <input
                        type="text"
                        placeholder="검색할 제목을 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="ListCategory-select">
                    <div className={`ListCategory-selectItem ${selectedCategory === "전체" ? "selected" : ""}`}
                         onClick={() => handleCategoryChange("전체")}>전체
                    </div>
                    <div className={`ListCategory-selectItem ${selectedCategory === "자유" ? "selected" : ""}`}
                         onClick={() => handleCategoryChange("자유")}>자유게시판
                    </div>
                    <div className={`ListCategory-selectItem ${selectedCategory === "주류" ? "selected" : ""}`}
                         onClick={() => handleCategoryChange("주류")}>주류게시판
                    </div>
                    <div className={`ListCategory-selectItem ${selectedCategory === "모임" ? "selected" : ""}`}
                         onClick={() => handleCategoryChange("모임")}>모임게시판
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="loadingAndNothing">
                    <Loading/>
                </div>
            ) : filteredBoardsList.length === 0 ? (
                <div className="loadingAndNothing">검색 결과가 없습니다.</div>
            ) : (
                <div className="PostContainer">
                    {currentItems.map((board, index) => (
                        <div className="bbsPost bbsPostItem" onClick={() => handleBoardClick(board.boardId)} key={index}
                             onMouseEnter={() => setHoveredImage(board.boardId)}
                             onMouseLeave={() => setHoveredImage(null)}>
                            {/*<Link to={`/BbsDetail/${board.boardId}`}>*/}
                            {hoveredImage === board.boardId && (
                                <div className="hoveredImageContainer"
                                     style={{backgroundImage: `url(${board.imageUrl ? `/public/${board.imageUrl}` : '/public/boardImg/위스키귀엽쥬.png'})`}}>
                                    {/* 이미지 또는 내용을 여기에 추가 */}
                                </div>
                            )}
                            <div className="bbsPostBackground" onClick={() => openModal(board.boardId)}>
                            <div className="BoardListCreateDate">
                                    <DateAndTime createDate={board.createDate}/>
                                    <div>{board.boardCategory}</div>
                                </div>
                                <div className="PostDetailTop">
                                    <h3>{board.boardTitle}</h3>
                                </div>
                                <div className="PostDetailBottom">
                                    <div className="PostDetailBottomItem PostDetailBottomAuthor">{board.nickname}</div>
                                    <div className="PostDetailBottomItem PostDetailBottomCV">
                                        <div className="PostDetailBottomCVItem ReplyComment">
                                            <FaRegComment/>
                                            <p>{board.commentCount}</p>
                                        </div>
                                        <div className="PostDetailBottomCVItem Views">
                                            <FiEye/>
                                            <p>{board.boardViews}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*</Link>*/}
                        </div>
                    ))}
                </div>
            )}
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
