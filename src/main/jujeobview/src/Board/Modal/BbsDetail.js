import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import Modal from "react-modal";
import '../BbsStyle/bbsDetail.css'

import BbsModifyModal from "./BbsModify";
import BbsDeleteModal from "./BbsDelete";

function BbsDetail({ isOpen, onRequestClose, boardId , onRequestOpen}) {
    const [board, setBoard] = useState(null);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    Modal.setAppElement('#root');

    useEffect(() => {
        if (boardId) {
            /*console.log("여긴 들어왔어")*/
              axios.get(`/board/Detail/${boardId}`)
                .then((response) => {
                    /*console.log("오케이 데이터 요청했다")*/
                    setBoard(response.data);
                })
                .catch((error) => {
                    console.error('데이터 가져오기 실패:', error);
                });
        }
    }, [boardId]);
    if (!board) {
        return null;
    }

    const openModifyModal = () => {
        setIsModifyModalOpen(true);
    };

    const closeModifyModal = () => {
        setIsModifyModalOpen(false);
    };

    const openDeleteModal = ()=>{
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = ()=>{
        setIsDeleteModalOpen(false);
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Bbs Detail Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    },
                    content: {
                        width: '65%',
                        height: '90%',
                        margin: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'white rgba(255, 255, 255, 0)',
                        border: 'none',
                        padding: '0'
                    }
                }}
            >
                <div className="Board-Detail-Container">
                    <div className="Board-Detail-Post-Container">
                        <div className="Board-Detail-Profile">
                            <div className="Profile">조회수: {board.boardViews}</div>
                            <div className="Profile"><img alt="이미지"/></div>
                            <div className="Profile">작성자</div>
                            <div className="Profile Profile-Setting">편집점</div>
                        </div>
                        <div className="Board-Detail-TitleAndContent">
                        <div className="TitleAndContent TitleAndContent-Title"><h3>{board.boardTitle}</h3></div>
                            <div className="TitleAndContent TitleAndContent-Content">{parse(board.boardContent)}</div>
                            <div className="TitleAndContent TitleAndContent-Img"><img alt="이미지"/></div>
                        </div>
                        <div className="Board-Detail-UpdateAndDelete">
                            <div className="UpdateButton" onClick={() => openModifyModal(board.boardId)}>수정하기</div>
                            <div className="DeleteButton" onClick={() => openDeleteModal(board.boardId)}>삭제하기</div>
                        </div>
                        <div className="Board-Detail-Date">
                            <div className="Date">작성일 : {new Date(board.createDate).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}</div>
                            <div className="Date">수정일 : {new Date(board.boardUpdate).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}</div>
                        </div>
                    </div>
                    <div className="de"></div>
                    <div className="Board-Detail-Comment-Container">
                        <div>
                            <h1>여기는 댓글창</h1>
                        </div>
                        <div>여기는 댓글 리스트창</div>
                        <div>여기는 좋아요 같은거 창</div>
                        <div>여기는 채팅창</div>
                    </div>
                </div>
            </Modal>
            <BbsModifyModal
                isOpen={isModifyModalOpen}
                onRequestClose={closeModifyModal}
                boardId={board.boardId}
            />

            <BbsDeleteModal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                boardId={board.boardId}
            />
        </div>

    );
}

export default BbsDetail;
