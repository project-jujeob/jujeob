import {useParams} from "react-router-dom";
import ReviewStarRating from "./ReviewStarRating";
import {useState} from "react";
import {useAuth} from "../../../user/Context";
import axios from "axios";

function ReviewWrite({ product, closeModal, onReviewSubmitted }){

    const { payload } = useAuth();
    const { productNo } = useParams(); // 상품 번호 추출
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(null); // 선택된 별점을 저장하는 state

    //이렇게 가져오면 Object로 넘어옴
    //console.log("프로덕트"+product);
    //console.log("로케이션"+location);

    //Object로 가져온 값 확인
    //console.log("프로덕트"+Object.entri es(product));
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
        try {
            const response = await axios.post('/api/ReviewWrite/createReview', {
                reviewContent: reviewContent,
                star: rating,
                user: { userNo: payload.userNo },
                product: { productNo: productNo }
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
        /*리뷰작성컴포넌트 마이페이지로 옮길지 생각해봐야*/
        <>
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