import {Link} from "react-router-dom";
import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";
import React from "react";
import LikeBtnClick from "./Like/LikeBtnClick";
import {getImageUrl} from "../common/ImageUrl";

const ProductItem = ({ product, likes, setLikes, payload}) => {
    const handleClickAddToCart = (e, product,cartQuantity) => {
        e.preventDefault();
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }

        addToCart(product,payload.userNo, cartQuantity);

    };

    return (
        <div key={product.productNo} className="ProductItem">
            <Link to={`/ProductItemDetail/${product.productNo}`} className="link">
                <div className="ProductImgContainer">
                    <img className="ProductImg" src={getImageUrl(product.img)} alt={product.name}/>
                    <div className="ProductBtns">
                        <LikeBtnClick product={product} payload={payload} likes={likes} setLikes={setLikes}/>
                        <div className="ProductBasketBtn" onClick={(e) => handleClickAddToCart(e, product, 1)}>
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