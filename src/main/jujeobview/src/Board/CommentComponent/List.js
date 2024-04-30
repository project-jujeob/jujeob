
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import DeleteModal from "../CommentComponent/Delete";
import { useAuth } from "../../user/Context";
import Reply from "./Reply";
import { CgProfile } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { SlClose } from "react-icons/sl";
import { SlCheck } from "react-icons/sl";
import { SlOptions } from "react-icons/sl";
import DateAndTime from "../BoardComponent/DateAndTime";
function List({ commentsList, commentFetchData, boardId }) {
    const { payload } = useAuth();
    Modal.setAppElement('#root');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedCommentUserNo, setSelectedCommentUserNo] = useState(null);
    const [selectedNickname, setSelectedNickname] = useState(null);
    const [editMode, setEditMode] = useState({ id: null, content: null});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCommentIdForMenu, setSelectedCommentIdForMenu] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [selectedCommentIdForReply, setSelectedCommentIdForReply] = useState(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [selectedCommentParent, setSelectedCommentParent] = useState(null);

    useEffect(() => {
        if (selectedCommentUserNo !== null) {
            if (payload.userNo === selectedCommentUserNo) {
                setIsDeleteModalOpen(true);
            } else {
                alert("자신의 댓글만 삭제할 수 있습니다.");
                setSelectedCommentId(null);
                setSelectedCommentUserNo(null);
            }
        }
    }, [payload.userNo, selectedCommentUserNo]);

    const openDeleteModal = (commentId, userNo, commentParent) => {
        setSelectedCommentId(commentId);
        setSelectedCommentUserNo(userNo);
        setSelectedCommentParent(commentParent);
        setSelectedCommentIdForMenu(false);
    };

    const closeDeleteModal = (cancelled) => {
        setIsDeleteModalOpen(false);
        if (cancelled) {
            setSelectedCommentId(null);
            setSelectedCommentUserNo(null);
        }
    };
    const onDeleteComplete = () => {
        setIsDeleteModalOpen(false);
        setSelectedCommentId(null);
        setSelectedCommentUserNo(null);
    };
    const handleEdit = (commentId, commentContent, userNo) => {
        console.log("Dㅑ호" +commentId+ "컨텐" + commentContent+ " 멤버 "+  userNo)
        setSelectedCommentIdForReply(null);
        setShowReplyInput(false);
        if (payload.userNo !== userNo) {
            alert("자신의 댓글만 수정할 수 있습니다.");
            return setSelectedCommentIdForMenu(false);
        }
        setEditMode({ id: commentId, content: commentContent });
        setSelectedCommentIdForMenu(false);
    };

    useEffect(() => {
        // 수정 모드가 되면 input 요소에 포커스를 줌
        if (editMode.id !== null) {
            const input = document.querySelector(".Comment-UpdateInput");
            input.focus();
        }
    }, [editMode]);

    const handleSave = async (commentId, updatedContent , num) => {
        console.log(updatedContent)
        try {
            await fetch(`/boardComment/Update/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: updatedContent
            });
        } catch (error) {
            console.error("에러!" + error);
            alert("댓글을 수정할 수 없습니다.");
        } finally {
            if(num === 2){
                setEditMode({id: null, content: null});
                commentFetchData();
            }else if(num === 1){
                setEditMode({id: null, content: null});
                setTriggerUpdate(!triggerUpdate);
            }
        }
    };

    const cancel = () =>{
        setEditMode({ id: null, content: null });
    };

    const toggleMenu = (commentId) => {
        setSelectedCommentIdForMenu(commentId);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleReply = (commentId, Nickname) => {
        setSelectedCommentIdForMenu(null);
        cancel();
        if (selectedCommentIdForReply === commentId) {
            // 현재 선택한 댓글에 대한 답글 창이 열려 있는 경우 닫기
            setSelectedCommentIdForReply(null);
            setShowReplyInput(false);
            commentFetchData();
        } else {
            // 선택한 댓글에 대한 답글 창이 열려 있지 않은 경우 열기
            setSelectedCommentIdForReply(commentId);
            setShowReplyInput(commentId);

        }
        setSelectedNickname(Nickname);
    };

    const submitReply = async (commentParent, userNo, commentContent) => {
        try {
            setIsSubmitting(false);
            await fetch(`/boardComment/Reply/${commentParent}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentContent,
                    userNo,
                    commentParent
                    ,boardId
                }),
            });
            setCommentContent("");
            setTriggerUpdate(!triggerUpdate);
            const input = document.querySelector(".Comment-ReplyInput");
            input.focus();

        } catch (error) {
            setIsSubmitting(false);
            console.error('Error submitting reply:', error.message);
            alert('답글을 전송할 수 없습니다.');
        }
    };


    return (
        <div className="Comment-List">
            {commentsList.map((comment, index) => (
                <div className="Comment-Detail" key={index}>
                    <div>
                        <div className="Comment-Date">
                            <DateAndTime createDate={comment.createDate}/>
                        </div>
                        <div className="Comment-AuthorAndContent">
                            <div className="AuthorAndContent-ProfileImgAndAuthor">
                                <div className="AuthorAndContent Comment-ProfileImg"><CgProfile/></div>
                                <div className="AuthorAndContent Comment-Author">{comment.Nickname}</div>
                            </div>
                            {editMode.id === comment.commentId ? (
                                <div>
                                    <input
                                        className="Comment-UpdateInput"
                                        type="text"
                                        value={editMode.content}
                                        onChange={(e) => setEditMode({...editMode, content: e.target.value})}
                                    />
                                    <button className="Comment-UpdateCancel" onClick={() => cancel()}><SlClose /></button>
                                    <button className="Comment-UpdateSubmit" onClick={() => handleSave(comment.commentId, editMode.content, 2)}><SlCheck /></button>
                                </div>
                            ) : <div className="AuthorAndContent Comment-Content">{comment.commentContent}</div>}
                        </div>
                    </div>
                    <div className="Comment-Detail-UpdateAndDelete">
                        {showReplyInput === comment.commentId ? (
                            <div className="Comment-Reply" onClick={() =>handleReply(comment.commentId, comment.Nickname)}>답글 접기</div>
                        ) : (
                            <div className="Comment-Reply" onClick={() => handleReply(comment.commentId, comment.Nickname)}>답글 달기({comment.commentCount})</div>
                        )}
                        <div className="dropdown-toggle" onClick={() => toggleMenu(comment.commentId)}>
                            <SlOptions />
                        </div>
                        {selectedCommentIdForMenu === comment.commentId && (
                            <Modal
                                isOpen={true} onRequestClose={() => setSelectedCommentIdForMenu(null)}
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
                                     onClick={() => openDeleteModal(comment.commentId, comment.uesrNo, comment.commentParent)}>
                                    삭제
                                </div>
                                <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                                <div className="Comment-Detail-Item Comment-Detail-UpdateButton"
                                     onClick={() => handleEdit(comment.commentId, comment.commentContent, comment.userNo)}>
                                    수정
                                </div>
                            </Modal>
                        )}
                    </div>
                    {showReplyInput === comment.commentId && (
                        <div className="Comment-ReplyArea">
                            <input
                                className="Comment-ReplyInput"
                                type="text"
                                placeholder={`@${selectedNickname}에게 답글`}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                autoFocus
                            />
                            <button className="Comment-ReplySubmitButton"
                                    onClick={() => submitReply(comment.commentId, payload.userNo, commentContent)}
                                    style={{transform: commentContent ? 'scale(1.15)' : 'scale(1)'}}
                                    disabled={!commentContent || isSubmitting}
                            >

                                <FiSend />
                            </button>
                        </div>
                    )}
                    {selectedCommentIdForReply === comment.commentId &&
                        <Reply
                            parentCommentId={comment.commentId}
                            triggerUpdate={triggerUpdate}
                            toggleMenu={toggleMenu}
                            selectedCommentIdForMenu={selectedCommentIdForMenu}
                            openDeleteModal={openDeleteModal}
                            setSelectedCommentIdForMenu={setSelectedCommentIdForMenu}
                            handleSave={handleSave}
                            handleEdit={handleEdit}
                        />}
                </div>
            ))}
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} commentId={selectedCommentId}
                         commentFetchData={commentFetchData} onDeleteComplete={onDeleteComplete} selectedCommentParent={selectedCommentParent}/>
        </div>
    );
}

export default List;
