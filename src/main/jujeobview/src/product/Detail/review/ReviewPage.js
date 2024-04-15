import ReviewWrite from "./ReviewWrite";
import {Link} from "react-router-dom";

function ReviewPage(){
    return(
        <div className="reviewContainer">
            <div className="reviewTop">
                <h2>상품 후기</h2>
            </div>
            <div>
                <Link to={"/ReviewWrite"}>
                    <button>리뷰 작성하기</button>
                </Link>
            </div>
            <div className="reviewContent">
                <div className="reviewContentLeft">
                    <div>
                        <span>작성자이름</span>
                    </div>
                </div>
                <article className="reviewContentRight">
                    <div>구매물품이름</div>
                    <div>리뷰내용</div>
                    <div>작성일자</div>
                </article>
            </div>
        </div>
    )
}

export default ReviewPage;