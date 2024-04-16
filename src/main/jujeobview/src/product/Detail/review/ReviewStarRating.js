import React, { useState } from "react";

function ReviewStarRating({ onRatingChange }) {
    const [rating, setRating] = useState(null);
    const [hoveredStar, setHoveredStar] = useState(null);

    // 클릭한 별점을 설정하는 함수
    const handleClick = (value) => {
        setRating(value);
        onRatingChange(value); // 선택된 별점을 부모 컴포넌트에 전달
    };

    // 별에 마우스를 올렸을 때 해당 별을 hover 상태로 설정하는 함수
    const handleMouseEnter = (value) => {
        setHoveredStar(value);
    };

    // 별에 마우스를 떼었을 때 hover 상태를 초기화하는 함수
    const handleMouseLeave = () => {
        setHoveredStar(null);
    };

    return (
        <div className="starRating">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                const isHovered = ratingValue <= hoveredStar;
                const isRated = ratingValue <= rating;

                return (
                    <span
                        key={ratingValue}
                        onClick={() => handleClick(ratingValue)}
                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                        onMouseLeave={handleMouseLeave}
                        className={`star ${isHovered || isRated ? "gold" : ""}`}
                    >
                        &#9733; {/*별모양*/}
                    </span>
                );
            })}
            {/*{rating && <p>{rating}점</p>}*/}
            <p className={rating ? "visible" : ""}>{rating}점</p>
        </div>
    );
}

export default ReviewStarRating;
