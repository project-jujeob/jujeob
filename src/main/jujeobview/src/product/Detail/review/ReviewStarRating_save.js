import {useState} from "react";

function ReviewStarRating(){

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return(
        <>
            {[...Array(5)].map((star,i)=>{
                const ratingValue = i + 1;

                return(
                    <label key={i}>
                        <input type="radio"
                               name="rating"
                               value={ratingValue}
                               onClick={()=>setRating(ratingValue)}
                        />
                        <FaStar
                            className="start"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(0)}
                        />
                    </label>
                );
            })}
            <p>별점 : {rating}</p>
        </>
    )
}
export default ReviewStarRating;