// 제품 아이템을 렌더링하는 컴포넌트
import useLikeCount from "./Like/LikeCount";
import {Link} from "react-router-dom";
import likeIcon from '../img/icon/likeIcon.png';
import likeIconChecked from '../img/icon/likeIconChecked.png';
import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";
import LikeBtnClick from "./Like/LikeBtnClick";
import axios from "axios";
import {useEffect, useState} from "react";
const ProductItem = ({ product, likes, setLikes, payload}) => {
    const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 추가

    useEffect(() => {
        // 페이지가 로드될 때마다 좋아요 수를 가져와서 업데이트
        axios.get(`/api/getLikeCount?productNo=${product.productNo}`)
            .then(response => setLikeCount(response.data))
            .catch(error => console.error('좋아요 수 가지고 오기 실패', error));
    }, [product.productNo]);

    const handleLikeClick = (e) => {
        // 좋아요 버튼 클릭 시, 서버로 좋아요 요청을 보내고 성공 시 좋아요 수를 업데이트
        LikeBtnClick(e, product, payload, likes, setLikes, setLikeCount);
    };

    const handleClickAddToCart = (e, product) => {
        e.preventDefault();
        addToCart(product,payload.memberNo);
    };

    return (
        <div key={product.productNo} className="ProductItem">
            <Link to={`/ProductItemDetail/${product.productNo}`} className="link">
                <div className="ProductImgContainer">
                    <img className="ProductImg" src={product.img} alt={product.name}/>
                    <div className="ProductBtns">
                        <div className="ProductLikeBtn" onClick={(e) => handleLikeClick(e, product)}>
                            <img src={likes[product.productNo] ? likeIconChecked : likeIcon} alt="Like Button"/>
                        </div>
                        <div className="LikeCount">{likeCount}</div>
                        <div className="ProductBasketBtn" onClick={(e) => handleClickAddToCart(e, product)}>
                            <img src={basketIcon} alt="Basket Button"/>
                        </div>
                    </div>
                </div>
                <div className="ProductName">{product.name}</div>
                <div className="ProductDescription">
                    {product.description.length > 18 ? `${product.description.substring(0, 18)}...` : product.description}
                </div>
                <div className="ProductAlcohol">{product.alcohol}%</div>
                <div className="ProductPrice">{product.price.toLocaleString()}원</div>
            </Link>
        </div>
    );
};
export default ProductItem;