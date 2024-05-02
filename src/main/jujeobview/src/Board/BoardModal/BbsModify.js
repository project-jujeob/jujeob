import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../BbsStyle/bbsWrite.css'
function BbsModify({ isOpen, onRequestClose, boardId }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    Modal.setAppElement('#root');
    useEffect( () => {
        const fetchData = async () => {

            try {
                const response = await fetch(`/board/Detail/${boardId}`);
                const data = await response.json();
                setTitle(data.boardTitle);
                setContent(data.boardContent);
            } catch(error){
                console.error("에러!" + error);
                alert("게시물을 수정할 수 없습니다.");
            }finally {
                setIsSubmitting(false);
            }
        };

        fetchData();
    }, [boardId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try{
            await fetch(`/board/Update/${boardId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            alert('게시물이 성공적으로 업데이트되었습니다!');
            onRequestClose();
        } catch (error){
            console.error("에러!", error)
            alert('게시물 업데이트에 실패하였습니다. 다시 시도해주세요.');
        }
    };

    const handlerTitleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Bbs Modify Modal"
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
                            <input
                                type="text"
                                value={title}
                                onChange={handlerTitleChange}
                            />
                        </div>
                        <div className="ContentArea">
                            <CKEditor
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
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                            />
                        </div>
                        <div className="ButtonArea">
                            <button className="submitButton" type="submit" disabled={isSubmitting}>수정 완료</button>
                            <button className="goBackButton" onClick={onRequestClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default BbsModify;
