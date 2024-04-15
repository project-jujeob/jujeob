import Header from "../../../common/Header";
import StarRating from "./ReviewStarRating";

function ReviewWrite(){
    return(
        /*리뷰작성컴포넌트 마이페이지로 옮길지 생각해봐야*/
        <>
            <Header/>

            <div className="reviewWriteContainer">
                <h2>후기 쓰기</h2>
                <div className="reviewProduct">
                    <span>상품명</span>
                </div>
                <div className="reviewStar">
                    <StarRating/>
                </div>
                <div className="reviewWriteContent">
                    <div className="reviewTextarea">
                        <textarea placeholder="후기입력"/>
                    </div>
                    <div className="reviewPrepareOrNot">
                        <div>취소</div>
                        <div>등록</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewWrite;