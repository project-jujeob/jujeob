import React from 'react';
import Modal from "react-modal";
import {useNavigate} from "react-router-dom";
import "../BbsStyle/bbsDelete.css";
function BbsDelete({ isOpen, onRequestClose, boardId }) {
    const navigate = useNavigate();
    Modal.setAppElement('#root');
    const handleDelete = async () => {
      try{
          const response = await fetch(`/board/Delete/${boardId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type' : 'application/json'
              }
          });
          alert('게시물이 삭제되었습니다.');
          onRequestClose();
          window.location.reload();
      } catch(error){
          console.error("에러!", error)
          alert('게시물 삭제 실패!')
      }
    };


    return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Bbs Delete Modal"
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

export default BbsDelete;