import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import React, {useEffect, useRef, useState} from "react";
import DetailScrollToTarget from "./DetailScrollToTarget";
import ReviewPage from "./review/ReviewPage";
import likeIconChecked from "../../img/icon/likeIconChecked.png";
import likeIcon from "../../img/icon/likeIcon.png";
import LikeBtnClick from "../Like/LikeBtnClick";
import {useAuth} from "../../member/Context";
import axios from "axios";


function DetailBeer({product}) {
    const { payload } = useAuth();
    const [likes, setLikes] = useState({});
    
    const handleAddToCart = () => {
        addToCart(product,payload.memberNo);
    };

    const contentTopRef = useRef(null);
    const bottomRef = useRef(null);
    const reviewRef = useRef(null);

    function handleLikeClick(e, product) {
        LikeBtnClick(e, product, payload, likes, setLikes);
    }

    useEffect(() => {
        if (payload && payload.memberNo) {
            userLikes();
        }
    }, [payload]);

    // 로그인한 사용자의 좋아요한 상품 확인
    const userLikes = () => {
        axios.post(`/api/checkedUserLikes?memberNo=${payload.memberNo}`)
            .then(checkedUserLike => {
                const updatedLikes = checkedUserLike.data.reduce((acc, item) => {
                    acc[item.productId] = item.likeStatus === 'Y';
                    return acc;
                }, {});
                setLikes(updatedLikes);
            })
            .catch(error => {
                console.error('좋아요 목록 로딩 실패:', error);
            });
    };

    return(
        <>
            <div className="detail">
                <div className="detailTop">
                    <div>
                        <img src={product.img} className="detailImgthumb" alt="술이미지"/>
                    </div>
                    <div className="detailRight">
                        <ProductType productId={product.productId}/>
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                        <div className="detailRightSpan">
                            <p><span>종류&ensp;:&ensp;</span> {product.type}</p>
                            <p><span>판매자&ensp;:&ensp;</span> {product.company}</p>
                            <p><span>도수&ensp;:&ensp;</span> {product.alcohol}</p>
                            <p><span>용량&ensp;:&ensp;</span> {product.volume}</p>
                            <p><span>추천 검색어&ensp;:&ensp;</span>{product.keyword}</p>
                            <p><span>구매수량 : &ensp;</span><QuantityCounter/></p>
                        </div>

                        <div className="detailBtn">
                            <div>[예약]</div>
                            <div className="ProductLikeBtn"
                                 onClick={(e) => handleLikeClick(e, product)}>
                                <img src={likes[product.productNo] ? likeIconChecked : likeIcon}
                                     alt="Like Button"/>
                            </div>
                            <button className="cartBtn" onClick={handleAddToCart}>장바구니 담기</button>
                        </div>
                    </div>
                </div>
                <div className="detailContent">
                    <DetailScrollToTarget
                        contentTopRef={contentTopRef}
                        bottomRef={bottomRef}
                        reviewRef={reviewRef}
                    />
                    <div className="detailContentTop" ref={contentTopRef}>
                        <div>[맥주] {product.name}</div>
                    </div>
                    <div>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            <div ref={reviewRef}>
                <ReviewPage product={product}/>
            </div>
        </>
    )
}

export default DetailBeer;