import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import DetailScrollToTarget from "./DetailScrollToTarget";
import React, {useEffect, useRef, useState} from "react";
import ReviewPage from "./review/ReviewPage";
import LikeBtnClick from "../Like/LikeBtnClick";
import axios from "axios";
import likeIconChecked from "../../img/icon/likeIconChecked.png";
import likeIcon from "../../img/icon/likeIcon.png";
import {useAuth} from "../../member/Context";


function DetailTraditional({product}) {
    const { payload } = useAuth();
    const [likes, setLikes] = useState({});

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

    const handleAddToCart = () => {
        addToCart(product);
    };

    const contentTopRef = useRef(null);
    const bottomRef = useRef(null);
    const reviewRef = useRef(null);

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
                        <div>[위스키/기타] {product.name}</div>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <img src={product.tastingImg} alt="술테이스팅노트" className="tastingNote"/>
                    </div>
                    <div className="detailContentInfo">
                        <p><span>제조 국가 | </span>{product.country}</p>
                        <p><span>브랜드 | </span>{product.brand}</p>
                        <p><span>케이스 | </span>{product.crate}</p>
                        <p><span>추천 음용법 | </span>{product.howToDrink}</p>
                    </div>
                </div>
                <div className="detailBottom" ref={bottomRef}>
                    <div>
                        <p><span>향 | </span>{product.aroma}</p>
                        <p><span>맛 | </span>{product.flavor}</p>
                        <p><span>여운 | </span>{product.finish}</p>
                    </div>
                </div>
            </div>
            <div ref={reviewRef}>
                <ReviewPage product={product}/>
            </div>
        </>
    )
}

export default DetailTraditional;