import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import Modal from "react-modal";
import '../BbsStyle/bbsDetail.css'

import BbsModifyModal from "./BbsModify";
import BbsDeleteModal from "./BbsDelete";
import Comment from "../Comment/Comment";
import {useAuth} from "../../member/Context";
import { FiEye } from "react-icons/fi";
import DateAndTime from "../BoardComponent/DateAndTime";
import { CgProfile } from "react-icons/cg";
import {SlOptions} from "react-icons/sl";

function BbsDetail({ isOpen, onRequestClose, boardId }) {
    const {payload} = useAuth();
    const [board, setBoard] = useState(null);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBoardIdForMenu, setSelectedBoardIdForMenu] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const handleUpdateModal = () => {
        axios.get(`/board/Detail/${boardId}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };
    if (!board) {
        return null;
    }

    const openModifyModal = () => {
        setSelectedBoardIdForMenu(null);
        if (payload.memberNo === board.memNo){
            setIsModifyModalOpen(true);
        }else{
            alert("자신의 게시물에만 수정이 가능합니다.")
        }
    };

    const closeModifyModal = () => {
        setIsModifyModalOpen(false);
        handleUpdateModal();
    };

    const openDeleteModal = ()=>{
        setSelectedBoardIdForMenu(null);
        if (payload.memberNo === board.memNo){
            setIsDeleteModalOpen(true);
        }else{
            alert("자신의 게시물에만 삭제가 가능합니다.")
        }
    }

    const closeDeleteModal = ()=>{
        setIsDeleteModalOpen(false);
    }

    const toggleMenu = (boardId) =>{
        setSelectedBoardIdForMenu(boardId);
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Bbs Detail Modal"
                className={{
                    base: 'ModalContent',
                    afterOpen: 'ModalContent open',
                    beforeClose: 'ModalContent'
                }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                            <div className="Profile Profile-Views">
                                <FiEye />
                                <p>{board.boardViews}</p>
                            </div>
                            <div className="Board-Detail-Date">
                                 <DateAndTime createDate={board.createDate}/>
                            </div>
                        </div>
                        <div className="Board-Detail-TitleAndContent">
                            <div className="TitleAndContent TitleAndContent-Title"><h3>{board.boardTitle}</h3></div>
                            <div className="TitleAndContent TitleAndContent-Profile">
                                <div className="Profile Profile-ProfileImg"><CgProfile/></div>
                                <div className="Profile ProfileMemberNickname">{board.memNickname}</div>
                                <div className="Profile-Setting" onClick={()=>toggleMenu(board.boardId)}><SlOptions/></div>
                            </div>
                            <div className="TitleAndContent TitleAndContent-Content">{parse(board.boardContent)}</div>
                            <div className="TitleAndContent TitleAndContent-Img"><img alt="이미지"/></div>
                        </div>
{/*                        <div className="Board-Detail-UpdateAndDelete">
                            <div className="UpdateButton" onClick={() => openModifyModal(board.boardId)}>수정하기</div>
                            <div className="DeleteButton" onClick={() => openDeleteModal(board.boardId)}>삭제하기</div>
                        </div>*/}
                    </div>
                    <div className="de"></div>
                    <Comment boardId={boardId}/>

                    {selectedBoardIdForMenu === board.boardId && (
                        <Modal
                            isOpen={true} onRequestClose={() => setSelectedBoardIdForMenu(null)}
                            className={{
                                base: 'ModalContent',
                                afterOpen: 'ModalContent open',
                                beforeClose: 'ModalContent'
                            }}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                },
                                content: {
                                    width: '15%',
                                    height: '10%',
                                    margin: 'auto',
                                    textAlign: 'center',
                                    padding: '0',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }
                            }}
                        >
                            <div className="Comment-Detail-Item Comment-Detail-DeleteButton"
                                 onClick={() => openDeleteModal(board.boardId)}>
                                삭제
                            </div>
                            <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                            <div className="Comment-Detail-Item Comment-Detail-UpdateButton"
                                 onClick={() => openModifyModal(board.boardId)}>
                                수정
                            </div>
                        </Modal>
                    )}
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
