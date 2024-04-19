// 제품 아이템을 렌더링하는 컴포넌트
import useLikeCount from "./Like/LikeCount";
import {Link} from "react-router-dom";

import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";
import axios from "axios";
import {useEffect, useState} from "react";
import LikeBtnClick from "./Like/LikeBtnClick";
const ProductItem = ({ product, likes, setLikes, payload}) => {


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
                        <LikeBtnClick product={product} payload={payload} likes={likes} setLikes={setLikes} />
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