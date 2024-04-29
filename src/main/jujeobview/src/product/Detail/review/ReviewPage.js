import {useEffect, useState} from "react";
import ReviewWrite from "./ReviewWrite";
import axios from "axios";
import Pagination from "../../../common/Pagination";

const PAGE_SIZE = 5;

function ReviewPage({product}) {

    const [reviews, setReviews] = useState([]);
    console.log("리뷰",reviews);
    /*const {payload} = useAuth();
    console.log("페이로드", payload);*/
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);


    useEffect(() => {
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                setReviews(response.data);
                setTotalReviews(response.data.length);
                setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });

    }, []);

    useEffect(() => {
        loadReviews();
    }, [currentPage]);

    const loadReviews = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE; // 페이지의 시작 인덱스 계산
        const endIndex = startIndex + PAGE_SIZE; // 페이지의 끝 인덱스 계산
        axios.get(`/api/Reviews/${product.productNo}`)
            .then((response) => {
                setReviews(response.data.slice(startIndex, endIndex));
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // 페이지 변경 시 현재 페이지 업데이트
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
            <Pagination
                totalItems={totalReviews} // 전체 리뷰 개수
                itemsPerPage={PAGE_SIZE} // 페이지 당 보여줄 리뷰 개수
                pageCount={3} // Pagination에서 보여줄 페이지 버튼 개수
                currentPage={currentPage} // 현재 페이지
                totalPages={totalPages} // 전체 페이지 수
                onPageChange={handlePageChange} // 페이지 변경 이벤트 핸들러
            />
        </div>
    )
}

export default ReviewPage;