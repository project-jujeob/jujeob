import Modal from "react-modal";
import React from "react";

function Delete({ isOpen, onRequestClose, commentId ,  commentFetchData, onDeleteComplete , selectedCommentParent}) {
    Modal.setAppElement('#root');
    const handleDelete = async () => {
        try{
            const response = await fetch(`/boardComment/Delete/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            alert('댓글이 삭제되었습니다.');
            if(selectedCommentParent === 0){
                commentFetchData();
            }else{

            }
            onRequestClose();
            onDeleteComplete();

        } catch(error){
            console.error("에러!", error)
            alert('댓글 삭제 실패!')
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Modal"
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
                    width: '13%',
                    height: '13%',
                    margin: 'auto',
                    border: 'none',
                    padding: '20px'
                }
            }}
        >
            <div className="DeleteContainer">
                <div className="WarringMessage">정말로 삭제 하시겠습니까?</div>
                <div className="ButtonContainer">
                    <button className="submitButton" onClick={handleDelete}>삭제</button>
                    <button className="goBackButton" onClick={onRequestClose}>닫기</button>
                </div>
            </div>
        </Modal>
    );
}

export default Delete;
