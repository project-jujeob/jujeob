
import React, { useState, useEffect } from "react";
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
    const [selectedMenuId, setSelectedMenuId] = useState(null);

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
    };

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
        setSelectedMenuId(commentId === selectedMenuId ? null : commentId);
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="Comment-List">
            {commentsList.map((comment, index) => (
                <div className="Comment-Detail" key={index}>
                    {editMode.id === comment.commentId ? ( // 수정 모드
                        <div>
                            <input
                                type="text"
                                value={editMode.content} // 수정된 내용을 입력 필드에 표시합니다.
                                onChange={(e) => setEditMode({ ...editMode, content: e.target.value })}
                            />
                            <button onClick={()=> cancel()}>취소</button>
                            <button onClick={() => handleSave(comment.commentId, editMode.content)}>저장</button>
                        </div>
                    ) : (
                        <div>
                            <div className="Comment-Detail-UpdateAndDelete">
                                <div className="dropdown-toggle" onClick={() => toggleMenu(comment.commentId)}>
                                    메뉴
                                </div>
                                {selectedMenuId === comment.commentId && (
                                    <div
                                        className={`dropdown-menu ${selectedMenuId === comment.commentId ? 'open' : ''}`}>
                                        <div
                                            className="Comment-Detail-Item Comment-Detail-DeleteButton"
                                            onClick={() => openDeleteModal(comment.commentId, comment.memNo)}
                                        >
                                            삭제
                                        </div>
                                        <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                                        <div
                                            className="Comment-Detail-Item Comment-Detail-UpdateButton"
                                            onClick={() => handleEdit(comment.commentId, comment.commentContent, comment.memNo)}
                                        >
                                            수정
                                        </div>
                                        <div className="Comment-Detail-Item Comment-Detail-Divide"></div>
                                        <div className="Comment-Detail-Item Comment-Detail-Reply">
                                            답글
                                        </div>
                                    </div>
                                )}
                            </div>
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
                            <div>
                                <div className="Comment-Reply">답글보기</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} commentId={selectedCommentId} commentFetchData={commentFetchData} onDeleteComplete={onDeleteComplete}/>
        </div>
    );
}

export default List;
