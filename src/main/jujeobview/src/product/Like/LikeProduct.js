import axios from "axios";

const LikeProduct = (product, memberNo, isLiked) => {
    const likeData = {
        productId : product.productNo,
        memberNo : memberNo,
        likeStatus: isLiked ? 'Y' : 'N'
    }
    axios.post('/api/likeProduct', likeData)
        .then(likeProductList =>{
            alert(likeProductList.data)
            console.log(likeProductList);
        })
        .catch(error => {
            console.error('좋아요 저장 실패:', error);
        });

};


export default LikeProduct;