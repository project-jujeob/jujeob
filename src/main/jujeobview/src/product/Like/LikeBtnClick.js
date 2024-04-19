import LikeProduct from "./LikeProduct";
import axios from "axios";

const LikeBtnClick = (e, product, payload, likes, setLikes,setLikeCount) => {
    e.preventDefault();
    if (!payload) {
        alert("로그인한 사용자만 가능합니다!");
        return;
    }
    const isLiked = !likes[product.productNo];
    // UI를 즉시 업데이트
    const newLikes = { ...likes, [product.productNo]: !likes[product.productNo] };
    setLikes(newLikes);

    LikeProduct(product, payload.memberNo, isLiked);

    axios.get(`/api/getLikeCount?productNo=${product.productNo}`)
        .then(response => setLikeCount(response.data))
        .catch(error => console.error('좋아요 수 가지고 오기 실패', error));
};

export default LikeBtnClick;
