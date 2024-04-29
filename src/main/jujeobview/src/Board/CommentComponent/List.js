import React from "react";


function List({ commentsList }){
/*    if(commentsList.boardId == null){
        return <div className="Comment-List2">첫 번째 댓글이 되어주세요! </div>
    }*/
    return (
        <div className="Comment-List">
            {commentsList.map((comment, index) => (
                <div className="Comment-Detail" key={index}>
                    <div className="Comment-Date"> {new Date(comment.createDate).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}</div>
                    <div className="Comment-AuthorAndContent">
                        <div className="AuthorAndContent-ProfileImgAndAuthor">
                            <div className="AuthorAndContent Comment-ProfileImg">이미지</div>
                            <div className="AuthorAndContent Comment-Author">{comment.nickname}</div>

                        </div>
                        <div className="AuthorAndContent Comment-Content">{comment.commentContent}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default List;
