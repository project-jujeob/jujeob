import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BbsWrite() {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/Write', { boardTitle, boardContent });
            console.log(response.data);
            alert('게시글 작성 완료.')
            navigate('/BbsList');

            // 게시글 작성에 성공한 경우, 필요한 작업 수행
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            // 에러 처리
        }
    };


    return (
        <div>
            <h1>게시글 작성하기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={boardContent}
                        onChange={(e) => setBoardContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">작성 완료</button>
            </form>
        </div>
    );
}

export default BbsWrite;