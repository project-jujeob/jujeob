import React from 'react';
import likeIcon from '../../img/icon/likeIcon.png'
import likeIconChecked from '../../img/icon/likeIconChecked.png';
import axios from "axios";

const LikeBtnClick = ({ product, payload, likes, setLikes }) => {
    const handleLikeClick = async (e) => {
        e.preventDefault();
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        const isLiked = !likes[product.productNo];
        const newLikes = { ...likes, [product.productNo]: !likes[product.productNo] };
        setLikes(newLikes);

        // 좋아요 처리 로직을 내부에 통합
        try {
            const likeData = {
                productId: product.productNo,
                memberNo: payload.memberNo,
                likeStatus: isLiked ? 'Y' : 'N'
            };
            const response = await axios.post('/api/likeProduct', likeData);
            alert(response.data);
            console.log(response);
        } catch (error) {
            console.error('좋아요 저장 실패:', error);
        }
    };

    return (
        <div className="ProductLikeBtn" onClick={handleLikeClick}>
            <img src={likes[product.productNo] ? likeIconChecked : likeIcon} alt="Like Button"/>
        </div>
    );
};

export default LikeBtnClick;