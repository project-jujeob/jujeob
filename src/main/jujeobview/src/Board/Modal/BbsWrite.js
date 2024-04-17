import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../BbsStyle/bbsWrite.css"
import Modal from "react-modal";

function BbsWrite({ isOpen, onRequestClose, boardId }) {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    Modal.setAppElement('#root');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/board/Write', { boardTitle, boardContent});
            console.log(response.data);
            alert('게시물 작성 완료.')
            window.location.reload();
        } catch (error) {
            console.error('게시물 작성 실패:', error);
            // 에러 처리
        }
    };

    return (
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
            <div className="BbsWriteContainer">
                <form onSubmit={handleSubmit}>
                    <div className="TitleArea">
                        <input
                            type="text"
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            required
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div className="ContentArea">
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                placeholder: "내용을 입력하세요.",
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBoardContent(data);
                            }}
                        />
                        {/*<input type="file" onChange={saveBoardImg}/>*/}
                    </div>
                    <div className="ButtonArea">
                        <button className="submitButton" type="submit">작성 완료</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default BbsWrite;
