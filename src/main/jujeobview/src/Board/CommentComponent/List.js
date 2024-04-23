import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import DeleteModal from "../CommentComponent/Delete";
import {useAuth} from "../../member/Context";

function List({ commentsList , commentFetchData}){
    const {payload} = useAuth();
    Modal.setAppElement('#root');
    // 삭제 모달의 상태를 관리하는 useState 훅
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedCommentMemNo, setSelectedCommentMemNo]= useState(null);
    // 삭제할 댓글의 id를 관리하는 useState 훅

    // 삭제 모달을 열기 위한 함수
    useEffect(() => {
        // selectedCommentMemNo가 null이 아닌 경우에만 실행
        if (selectedCommentMemNo !== null) {
            console.log("셀렉티멤넘" + selectedCommentMemNo);
            if (payload.memberNo === selectedCommentMemNo) {
                setIsDeleteModalOpen(true);
            } else {
                alert("자신의 게시물에만 삭제가 가능합니다.");
            }
        }
    }, [payload.memberNo, selectedCommentMemNo]);
    const openDeleteModal = (commentId, memNo) => {
        setSelectedCommentId(commentId);
        setSelectedCommentMemNo(memNo);
        console.log("페이로드" + payload.memberNo);
    };

    if (commentsList && Array.isArray(commentsList)) {
        if (commentsList.length === 0) {
            return <div className="Comment-List">첫 댓글의 주인공이 되어라.</div>
        }
    }
    return (
        <div className="Comment-List">
            {commentsList.map((comment, index) => (
                <div className="Comment-Detail" key={index}>
                    <button onClick={() => openDeleteModal(comment.commentId, comment.memNo)}>삭제</button>
                    <div className="Comment-Date"> {new Date(comment.createDate).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}</div>
                    <div className="Comment-AuthorAndContent">
                        <div className="AuthorAndContent-ProfileImgAndAuthor">
                            <div className="AuthorAndContent Comment-ProfileImg">이미지</div>
                            <div className="AuthorAndContent Comment-Author">{comment.memNickname}</div>
                        </div>
                        <div className="AuthorAndContent Comment-Content">{comment.commentContent}</div>
                    </div>
                </div>
            ))}
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={() => setIsDeleteModalOpen(false)} commentId={selectedCommentId} commentFetchData={commentFetchData}  />
        </div>
    );
}

export default List;
