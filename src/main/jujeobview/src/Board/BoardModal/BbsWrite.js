import React, { useState } from 'react';
import axios from 'axios';
import "../BbsStyle/bbsWrite.css"
import Modal from "react-modal";
import { useAuth } from "../../user/Context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function BbsWrite({ isOpen, onRequestClose }) {
    const { payload } = useAuth();
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const [boardCategory, setBoardCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    Modal.setAppElement('#root');

    let userNo = 0;
    if (payload !== null) {
        userNo = payload.userNo;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        if (!boardCategory || !boardTitle || !boardContent) {
            alert("제목, 내용, 카테고리를 모두 입력해주세요!");
            return;
        }
        try {
            let imageUrl = '';
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const response = await axios.post('/image/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = response.data
            }
            const response = await axios.post('/board/Write', {
                userNo,
                boardTitle,
                boardContent,
                boardCategory,
                imageUrl
            });
            alert('게시물 작성 완료.');
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
                        <label htmlFor="TitleInput"><span>* </span>제목</label>
                        <input
                            id="TitleInput"
                            type="text"
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            required
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div className="ContentArea">
                        <label htmlFor="ContentInput"><span>* </span>글 내용</label>
                        <CKEditor
                            id="ContentInput"
                            editor={ClassicEditor}
                            config={{
                                placeholder: "내용을 입력하세요.",
                                toolbar: {
                                    items: [
                                        'heading',
                                        '|',
                                        'bold',
                                        'italic',
                                        'link',
                                        'bulletedList',
                                        'numberedList',
                                        '|',
                                        'undo',
                                        'redo'
                                    ]
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBoardContent(data);
                            }}
                        />
                    </div>
                    <div className="category-select">
                        <label htmlFor="CategorySelect"><span>* </span>카테고리 선택</label>
                        <select id="CategorySelect" value={boardCategory} onChange={(e) => setBoardCategory(e.target.value)}>
                            <option value="">카테고리 선택</option>
                            <option value="자유">자유</option>
                            <option value="주류">주류</option>
                            <option value="모임">모임</option>
                        </select>
                    </div>
                    <div className="ImageUploadArea">
                    <label htmlFor="fileInput"><span>* </span>이미지 업로드</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
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
