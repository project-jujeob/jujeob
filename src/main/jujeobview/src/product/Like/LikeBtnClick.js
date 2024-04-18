import LikeProduct from "./LikeProduct";

const LikeBtnClick = (e, product, payload, likes, setLikes) => {
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
};

export default LikeBtnClick;
