import Write from "../CommentComponent/Wirte";
import List from "../CommentComponent/List";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../member/Context";
import Loading from "./Loading";
function Comment ({ boardId }){
    const { payload } = useAuth();
    const [commentsList, setCommentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (boardId) {
            commentFetchData();
        }
    }, [boardId]);
    const commentFetchData = () => {
        setLoading(true);
        axios
            .get(`boardComment/CommentData/${boardId}`)
            .then((response) => {
                const filteredComments = response.data.filter(comment => comment.commentParent === 0 && comment.isDeleted === 0);
                const sortedComments = filteredComments.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                setCommentsList(sortedComments);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
                setLoading(false);
            });
    };
    return (
        <div className="Board-Detail-Comment-Container">
            {loading ? ( // 로딩 중일 때는 로딩 화면을 표시
                <div className="loading">
                    <Loading />
                </div>
                    ) : (
                <>
                    <List commentsList={commentsList} boardId={boardId} commentFetchData={commentFetchData}  />
                    <div className="Comment-LikeArea">하트</div>
                    <Write boardId={boardId} commentFetchData={commentFetchData} />
                </>
            )}
        </div>
    );
}

export default Comment;