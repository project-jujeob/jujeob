import ReviewStarRating from "./ReviewStarRating";
import {useState} from "react";
import {useAuth} from "../../../member/Context";
import axios from "axios";

function ReviewWrite({ item, closeModal, onReviewSubmitted }){

    const { payload } = useAuth();
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(null); // 선택된 별점을 저장하는 state

    // textarea 내용 변경 시 호출되는 함수
    const handleReviewChange = (event) => {
        // 입력된 내용을 상태에 저장
        setReviewContent(event.target.value);
    };

    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating); // 선택된 별점을 state에 저장
    };

    const handleReviewSubmit = async () => {
        try {
            const response = await axios.post('/api/ReviewWrite/createReview', {
                reviewContent: reviewContent,
                star: rating,
                member: { memNo: payload.memberNo },
                product: { productNo: item.productNo }
            });
            if (response.status === 200 || response.status === 201) {
                alert("리뷰가 작성되었습니다");
                closeModal();
                // 새로운 리뷰가 등록된 후 ReviewPage로 콜백 함수 호출
                onReviewSubmitted();
            } else {
                console.error('리뷰 등록 실패');
            }
        } catch (error) {
            console.error('요청 보내기 실패:', error);
        }
    };

    return(
        <>
            <div className="reviewWriteContainer">
                <h2>후기 쓰기</h2>
                <div className="reviewProduct">
                    <div>
                        <img src={item.img} alt="리뷰썸네일"/>
                    </div>
                    <div>
                        <span>{item.productName}</span>
                        <span>{item.alcohol}도</span>
                        <span>{item.volume}</span>
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
                        <span>{reviewContent.length}/300</span>
                    </div>
                    <div className="reviewPrepareOrNot">
                        <div onClick={closeModal}>취소</div>
                        <div onClick={handleReviewSubmit}>등록</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReviewWrite;