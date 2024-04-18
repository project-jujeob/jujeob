import React, {useState} from "react";
import axios from "axios";

function List({ PostId }){
    const [CommentsList,setCommentsList] = useState([]);

    const fetchData = ()=>{
      axios
          .get(`boardComment/CommentData`)
          .then((response) =>{
              const newComments = response.data;
              setCommentsList((prevCommentsList)=>[...prevCommentsList, ...newComments]);
          })
          .catch((error) => {
              console.error("데이터 가져오기 실패:", error);
          });
    };
    console.log(CommentsList);
    return (
        <div className="Comment-List">
            {CommentsList.map((comment, index)=>(
                <div className="Comment-Detail">
                        <div className="Comment-Date">{comment.CreateDate}</div>
                        <div className="Comment-AuthorAndContent">
                            <div className="AuthorAndContent-ProfileImgAndAuthor">
                                <div  className="AuthorAndContent Comment-ProfileImg">이미지</div>
                                <div className="AuthorAndContent Comment-Author">작성자</div>
                            </div>
                            <div className="AuthorAndContent Comment-Content">{comment.CommentContent}</div>
                        </div>
                </div>
            ))}
        </div>
    );
}

export default List;