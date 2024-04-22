import React, {useState} from "react";
import axios from "axios";
import {useAuth} from "../../member/Context";

function Write({ boardId, commentFetchData }){
    const [commentContent, setCommentContent] = useState(null);
    const [d,setD] = useState([boardId, commentContent]);
    const {payload} = useAuth();
    const memNo = payload.memberNo.toString();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        try{
            const response = await axios.post(`/boardComment/Write`, {
                memNo,
                boardId,
                commentContent});
            alert('댓글 성공!')
            commentFetchData();
        } catch (error) {
            console.error('댓글 실패', error);
        }
    };
    return (
        <div className="Comment-Write">
            <form onSubmit={handleSubmit}>
                <input
                       type="text"
                       placeholder="선플"
                       onChange={(e)=> setCommentContent(e.target.value)}
                />
                <button className="Comment-SubmitButton" type="submit">Send</button>
            </form>
        </div>
    );
}

export default Write;