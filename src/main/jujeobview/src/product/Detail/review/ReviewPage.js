import { useEffect, useState } from "react";
import ReviewWrite from "./ReviewWrite";
import axios from "axios";
import Pagination from "../../../common/Pagination";

const PAGE_SIZE = 5;

function ReviewPage({ product }) {

    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                const fetchedReviews = response.data;
                setReviews(fetchedReviews);
                setTotalReviews(fetchedReviews.length);
                setTotalPages(Math.ceil(fetchedReviews.length / PAGE_SIZE));
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    useEffect(() => {
        loadReviews();
    }, [currentPage]);

    const loadReviews = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                const fetchedReviews = response.data.slice(startIndex, endIndex);
                setReviews(fetchedReviews);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getStarRating = (star) => {
        // 리뷰의 별점에 따라 별표로 표현하기
        const stars = '★'.repeat(star); // 별표를 해당 별점 수만큼 반복해서 생성
        const emptyStars = '☆'.repeat(5 - star); // 남은 별표를 빈 별표로 채움
        return (
            <span className="star-rating">
                <span className="star">{stars}</span>
                <span>{emptyStars}</span>
            </span>
        );
    };

    return (
        <div className="reviewContainer">
            <div className="reviewTop">
                <h2>상품 후기</h2>
            </div>
            <div className="reviewContentList">
                {reviews.length === 0 ? (
                    <div className="emptyReview">리뷰가 없습니다</div>
                ) : (
                    reviews.map((review) => {
                        return (
                            <div key={review.reviewNo} className="reviewContent">
                                <div className="reviewContentLeft">
                                    <div>
                                        <span>{review.nickname}</span>
                                    </div>
                                </div>
                                <article className="reviewContentRight">
                                    <div>{review.productName }</div>
                                    <div>{review.reviewContent.split('\n')
                                        .map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}</div>
                                    <div>{getStarRating(review.star)}</div> {/* 별점 표시 */}
                                    <div>{new Date(review.reviewDate).toLocaleDateString()}</div>
                                </article>
                            </div>
                        );
                    })
                )}

            </div>
            <Pagination
                totalItems={totalReviews}
                itemsPerPage={PAGE_SIZE}
                pageCount={3}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default ReviewPage;
