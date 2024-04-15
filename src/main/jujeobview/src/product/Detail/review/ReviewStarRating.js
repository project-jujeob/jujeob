import React, { useState } from "react";

function StarRating() {
    const [rating, setRating] = useState(null);

    // 클릭한 별점을 설정하는 함수
    const handleClick = (value) => {
        setRating(value);
    };

    return (
        <div className="starRating">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                const starStyle = {
                    cursor: "pointer",
                    color: ratingValue <= rating ? "gold" : "gray",
                    fontSize:"45px"
                };

                return (
                    <span
                        key={ratingValue}
                        onClick={() => handleClick(ratingValue)}
                        style={starStyle}
                    >
            &#9733; {/*별모양*/}
          </span>
                );
            })}
            {rating && <p>{rating}점</p>}
        </div>
    );
}

export default StarRating;
