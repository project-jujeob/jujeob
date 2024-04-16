import axios from "axios";

const LikeProduct = (product, memberNo) => {
    const likeData = {
        productId : product.productNo,
        memberNo : memberNo
    }
    console.log("메머넘버"+memberNo);
    axios.post('api/likeProduct', likeData)
        .then(likeProductList =>{
            alert(likeProductList.data)
        })
        .catch(error => {
            console.error('좋아요 저장 실패:', error);
        });
};
export default LikeProduct;