import React, { useState } from "react";
import axios from "axios";
import {useAuth} from "../../user/Context";
import { FiSend } from "react-icons/fi";
function Write({ boardId, commentFetchData }) {
    const [commentContent, setCommentContent] = useState("");
    const { payload } = useAuth();
    const userNo = payload.userNo
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(payload.userNo+ "유저의 유저의!");
        console.log(userNo + "유저의 유저의 ddddddddd!");
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/boardComment/Write`, {
                userNo,
                boardId,
                commentContent,
            });
            commentFetchData();
            setCommentContent("");
        } catch (error) {
            console.error("댓글 실패", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="Comment-Write">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="선플"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button
                    className="Comment-SubmitButton"
                    style={{transform: commentContent ? 'scale(1.15)' : 'scale(1)'}}
                    type="submit"
                    disabled={!commentContent || isSubmitting}
                >
                    <FiSend />
                </button>
            </form>
        </div>
    );
}

export default Write;