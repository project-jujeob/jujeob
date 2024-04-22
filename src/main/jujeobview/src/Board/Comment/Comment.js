import Write from "../CommentComponent/Wirte";
import List from "../CommentComponent/List";
import {useEffect, useState} from "react";
import axios from "axios";
function Comment ({ boardId }){
    
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        if (boardId) {
            commentFetchData();
        }
    }, [boardId]);
    const commentFetchData = () => {
        axios
            .get(`boardComment/CommentData/${boardId}`)
            .then((response) => {
                const sortedComments = response.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                setCommentsList(sortedComments);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    };
    return (
        <div className="Board-Detail-Comment-Container">
            <List commentsList={commentsList}/>
            <div className="Comment-LikeArea">하트</div>
            <Write boardId={boardId} commentFetchData={commentFetchData} />
        </div>
    );
}

export default Comment;