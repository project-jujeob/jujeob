import "../../MainPage.css";
import "../BbsStyle/bbsSlideAndBestPost.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BbsDetailModal from "../BoardModal/BbsDetail";
import {useAuth} from "../../user/Context";
function BbsSlideAndBestPost() {
    const { payload } = useAuth();
    const [boardsList, setBoardsList] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bestPostList = () => {
        axios
            .get(`board/boardBest`)
            .then((response) => {
                const sortedBoards = response.data.sort((a, b) => b.boardViews - a.boardViews).slice(0, 5);
                const newBoards = sortedBoards.filter(board => board.isDeleted === 0);
                setBoardsList(newBoards);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    };
    useEffect(() => {
        bestPostList();
    }, []);
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
        bestPostList();
    };


    return (
        <div className="SlideAndBestPostArea">
            {/*<SlideArea mostLikedProducts={mostLikedProducts}/>*/}
            <div className="BestPostArea">
                <div className="Best">베스트 게시글</div>
                <div className="BestPostDetail Header">
                    <div className="BestTitle">제목</div>
                    <div className="BestAuthor">작성자</div>
                    <div className="BestViews">조회수</div>
                    <div className="BestComments">댓글</div>
                    <div className="BestDate">작성일</div>
                </div>
                {boardsList.map((board, index) => (
                    <div
                        key={index}
                        className={index % 2 === 0 ? "BestPostDetail even" : "BestPostDetail odd"}
                        onClick={() => {
                            openModal(board.boardId);
                            setSelectedBoardId(board.boardId);
                        }}
                    >
                        <div className="BestTitle BestTitleDetail">{board.boardTitle}</div>
                        <div className="BestAuthor">{board.nickname}</div>
                        <div className="BestViews">{board.boardViews}</div>
                        <div className="BestComments">{board.commentCount}</div>
                        <div className="BestDate">
                            {new Date(board.createDate).toLocaleString("KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <BbsDetailModal
                isOpen={isModalOpen}
                onRequestOpen={openModal}
                onRequestClose={closeModal}
                boardId={selectedBoardId}
            />
        </div>
    );

}

export default BbsSlideAndBestPost;