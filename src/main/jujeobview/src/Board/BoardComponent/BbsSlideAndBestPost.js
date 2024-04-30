import "../../MainPage.css";
import "../BbsStyle/bbsSlideAndBestPost.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function BbsSlideAndBestPost() {
    const [boardsList, setBoardsList] = useState([]);
    const bestPostList = () => {
        axios
            .get(`board/boardData`)
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
    }, [boardsList]);

    return (
        <div className="SlideAndBestPostArea">
            <div className="SlideArea">이곳은 슬라이드</div>
            <div className="BestPostArea">이곳은 베스트글입니다.
                {boardsList.map((board, index) => (
                    <div key={index}>
                        <div>{board.boardTitle}</div>
                        <div>{board.boardContent}</div>
                        <div>{board.boardViews}</div>
                        <div>{board.Nickname}</div>
                        <div>{board.commentCount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BbsSlideAndBestPost;