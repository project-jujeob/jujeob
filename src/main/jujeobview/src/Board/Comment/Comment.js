import Write from "../CommentComponent/Wirte";
import List from "../CommentComponent/List";
function Comment ({ boardId }){

    return (
        <div className="Board-Detail-Comment-Container">
            <List boardId={boardId}/>
            <div className="Comment-LikeArea">하트</div>
            <Write boardId={boardId} />
        </div>
    );
}

export default Comment;