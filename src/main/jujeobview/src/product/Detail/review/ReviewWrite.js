import Header from "../../../common/Header";
import {useLocation, useParams} from "react-router-dom";
import ReviewStarRating from "./ReviewStarRating";
import {useState} from "react";

function ReviewWrite(){

    const location = useLocation();
    const { productNo } = useParams(); // 상품 번호 추출
    const product = location.state.product;
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(null); // 선택된 별점을 저장하는 state


    //이렇게 가져오면 Object로 넘어옴
    //console.log("프로덕트"+product);
    //console.log("로케이션"+location);

    //Object로 가져온 값 확인
    //console.log("프로덕트"+Object.entries(product));
    //console.log("로케이션"+Object.entries(location));

    // textarea 내용 변경 시 호출되는 함수
    const handleReviewChange = (event) => {
        // 입력된 내용을 상태에 저장
        setReviewContent(event.target.value);
    };

    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating); // 선택된 별점을 state에 저장
    };


    const handleReviewSubmit = async () => {
        console.log("선택된 별점:", rating);
        try {
            const response = await fetch('/api/ReviewWrite/createReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reviewContent: reviewContent,
                    star: rating,
                    member: { memNo: 1 }, // todo : 로그인유저정보 가져와야함
                    product: { productNo: productNo } // 수정된 필드명
                })
            });
            if (response.ok) {
                // 서버에 리뷰 등록 성공 시 페이지 이동
                window.location.href = '/reviews'; // 예시: 리뷰 목록 페이지로 이동
            } else {
                // 서버에서 오류 응답을 받은 경우
                console.error('리뷰 등록 실패');
            }
        } catch (error) {
            // 네트워크 오류 등으로 요청을 보낼 수 없는 경우
            console.error('요청 보내기 실패:', error);
        }
    }

    return(
        /*리뷰작성컴포넌트 마이페이지로 옮길지 생각해봐야*/
        <>
            <Header/>
            <div className="reviewWriteContainer">
                <h2>후기 쓰기</h2>
                <div className="reviewProduct">
                    <div>
                        <img src={product.img} alt="리뷰썸네일"/>
                    </div>
                    <div>
                        <span>{product.name}</span>
                        <span>{product.alcohol}도</span>
                        <span>{product.volume}</span>
                    </div>

                </div>
                <div className="reviewStar">
                    <ReviewStarRating onRatingChange={handleRatingChange} />
                </div>
                <div className="reviewWriteContent">
                    <div className="reviewTextarea">
                        <textarea placeholder="후기입력"
                                  value={reviewContent}
                                  onChange={handleReviewChange}
                                  maxLength={300}
                        />
                    </div>
                    <div className="characterCount">
                        {reviewContent.length}/300
                    </div>
                    <div className="reviewPrepareOrNot">
                        <div>취소</div>
                        <div onClick={handleReviewSubmit}>등록</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReviewWrite;