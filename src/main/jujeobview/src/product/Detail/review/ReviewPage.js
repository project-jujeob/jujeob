import {useAuth} from "../../../member/Context";
import {useEffect, useState} from "react";
import ReviewWrite from "./ReviewWrite";
import axios from "axios";

function ReviewPage({product}) {

    const [reviews, setReviews] = useState([]);
    console.log("리뷰",reviews);

    /*const {payload} = useAuth();
    console.log("페이로드", payload);*/

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });

    }, []);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };

    const handleReviewSubmitted = () => {
        // 새로운 리뷰가 등록된 후 호출될 콜백 함수
        loadReviews(); // 새로운 리뷰를 불러오는 작업 수행
    };

    return (
        <div className="reviewContainer">
            <div className="reviewTop">
                <h2>상품 후기</h2>
                <div onClick={toggleModal}>리뷰 작성하기</div>
            </div>

            {modal && (
                <div className="modal">
                <div className="modalContent">
                        <span className="modalClose" onClick={toggleModal}>&times;</span>
                        <ReviewWrite product={product} onReviewSubmitted={handleReviewSubmitted} closeModal={toggleModal}/>
                    </div>
                </div>
            )}
            <div className="reviewContentList">
                {reviews.length === 0 ? (
                    <div className="emptyReview">리뷰가 없습니다</div>
                ) : (
                    reviews.map((review) => {
                        console.log("리뷰", review); // 여기로 이동됨
                        return (
                            <div key={review.reviewNo} className="reviewContent">
                                <div className="reviewContentLeft">
                                    <div>
                                        <span>{review.memNickname}</span>
                                    </div>
                                </div>
                                <article className="reviewContentRight">
                                    <div>{review.productName }</div>
                                    <div>{review.reviewContent.split('\n')
                                        .map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}</div>
                                    <div>{new Date(review.reviewDate).toLocaleDateString()}</div>
                                </article>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default ReviewPage;