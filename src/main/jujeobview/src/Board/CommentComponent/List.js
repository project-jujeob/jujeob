
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import DeleteModal from "../CommentComponent/Delete";
import { useAuth } from "../../member/Context";

function List({ commentsList, commentFetchData }) {
    const { payload } = useAuth();
    Modal.setAppElement('#root');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedCommentMemNo, setSelectedCommentMemNo] = useState(null);
    const [editMode, setEditMode] = useState({ id: null, content: null});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCommentIdForMenu, setSelectedCommentIdForMenu] = useState(null);
    const inputRef = useRef(null);
    useEffect(() => {
        if (selectedCommentMemNo !== null) {
            if (payload.memberNo === selectedCommentMemNo) {
                setIsDeleteModalOpen(true);
            } else {
                alert("자신의 댓글만 삭제할 수 있습니다.");
                setSelectedCommentId(null);
                setSelectedCommentMemNo(null);
            }
        }
    }, [payload.memberNo, selectedCommentMemNo]);

    const openDeleteModal = (commentId, memNo) => {
        setSelectedCommentId(commentId);
        setSelectedCommentMemNo(memNo);
        setSelectedCommentIdForMenu(false);
    };

    const closeDeleteModal = (cancelled) => {
        setIsDeleteModalOpen(false);
        if (cancelled) {
            setSelectedCommentId(null);
            setSelectedCommentMemNo(null);
        }
    };
    const onDeleteComplete = () => {
        setIsDeleteModalOpen(false);
        setSelectedCommentId(null);
        setSelectedCommentMemNo(null);
    };
    const handleEdit = (commentId, commentContent, memNo) => {
        if (payload.memberNo !== memNo) {
            alert("자신의 댓글만 수정할 수 있습니다.");
            return;
        }
        setEditMode({ id: commentId, content: commentContent });
        setSelectedCommentIdForMenu(false);
    };

    useEffect(() => {
        // 수정 모드가 되면 input 요소에 포커스를 줌
        if (editMode.id !== null) {
            inputRef.current.focus();
        }
    }, [editMode]);

    const handleSave = async (commentId, updatedContent) => {
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
            setEditMode({id: null, content: null}); // 수정 종료
            commentFetchData();
        }
    };

    const cancel = () =>{
        setEditMode({ id: null, content: null });
    };

    const toggleMenu = (commentId) => {
        setSelectedCommentIdForMenu(commentId);
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className="Comment-List">
            {commentsList.map((comment, index) => (
                <div className="Comment-Detail" key={index}>
                    <div>
                        <div className="Comment-Date">
                            {new Date(comment.createDate).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </div>
                        <div className="Comment-AuthorAndContent">
                            <div className="AuthorAndContent-ProfileImgAndAuthor">
                                <div className="AuthorAndContent Comment-ProfileImg">이미지</div>
                                <div className="AuthorAndContent Comment-Author">{comment.memNickname}</div>
                            </div>
                            <div className="AuthorAndContent Comment-Content">{comment.commentContent}</div>
                        </div>
                    </div>
                    <div className="Comment-Detail-UpdateAndDelete">
                        <div className="Comment-Reply">답글보기</div>
                        <div className="dropdown-toggle" onClick={() => toggleMenu(comment.commentId)}>
                            ㆍㆍㆍ
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
                                        width: '20%',
                                        height: '15%',
                                        margin: 'auto',
                                        textAlign: 'center',
                                        padding: '0',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }
                                }}
                            >
                                <div className="Comment-Detail-Item Comment-Detail-DeleteButton" onClick={() => openDeleteModal(comment.commentId, comment.memNo)}>
                                    삭제
                                </div>
                                <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                                <div className="Comment-Detail-Item Comment-Detail-UpdateButton" onClick={() => handleEdit(comment.commentId, comment.commentContent, comment.memNo)}>
                                    수정
                                </div>
                                <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                                <div className="Comment-Detail-Item Comment-Detail-Reply">
                                    답글
                                </div>
                            </Modal>
                        )}
                    </div>
                    {editMode.id === comment.commentId && (
                        <div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={editMode.content}
                                onChange={(e) => setEditMode({...editMode, content: e.target.value})}
                            />
                            <button onClick={() => cancel()}>취소</button>
                            <button onClick={() => handleSave(comment.commentId, editMode.content)}>저장</button>
                        </div>
                    )}
                </div>
            ))}
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} commentId={selectedCommentId}
                         commentFetchData={commentFetchData} onDeleteComplete={onDeleteComplete}/>
        </div>
    );

}

export default List;
