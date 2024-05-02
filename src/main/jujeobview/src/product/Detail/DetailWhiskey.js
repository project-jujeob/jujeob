import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import DetailScrollToTarget from "./DetailScrollToTarget";
import React, {useRef, useState} from "react";
import ReviewPage from "./review/ReviewPage";
import LikeBtnClick from "../Like/LikeBtnClick";
import {useAuth} from "../../user/Context";
import useCheckUserLikes from "../Like/useCheckUserLikes";
import DetailScrollToTop from "./DetailScrollToTop";
import {getImageUrl} from "../../common/ImageUrl";


function DetailTraditional({product}) {
    const { payload } = useAuth();
    const [cartQuantity, setCartQuantity] = useState(1);

    const [likes, setLikes] = useCheckUserLikes(payload?.userNo);

    const handleAddToCart = () => {
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        addToCart(product, payload.userNo, cartQuantity);

    };

    const handleQuantityChange = (newQuantity) => {
        setCartQuantity(newQuantity); // 수량 변경 시 장바구니에 추가될 수량 업데이트
    };

    const contentTopRef = useRef(null);
    const bottomRef = useRef(null);
    const reviewRef = useRef(null);

    return(
        <>
            <div className="detail">
                <div className="detailTop">
                    <div>
                        <img className="detailImgthumb" src={getImageUrl(product.img)} alt="술이미지"/>
                    </div>
                    <div className="detailRight">
                        <ProductType productId={product.productId}/>
                        <h1>{product.name}</h1>
                        <h2>{product.price.toLocaleString()}원</h2>
                        <div className="detailRightSpan">
                            <p><span>종류&ensp;:&ensp;</span> {product.type}</p>
                            <p><span>판매자&ensp;:&ensp;</span> {product.company}</p>
                            <p><span>도수&ensp;:&ensp;</span> {product.alcohol}%</p>
                            <p><span>용량&ensp;:&ensp;</span> {product.volume}</p>
                            <p><span>추천 검색어&ensp;:&ensp;</span>{product.keyword}</p>
                            <p><span>구매수량 : &ensp;</span>
                                <QuantityCounter initialQuantity={1} // 초기 수량 설정
                                                 onQuantityChange={handleQuantityChange} // 수량 변경 시 addToCart 함수 호출
                                /></p>
                        </div>

                        <div className="detailBtn">
                            <div>[예약]</div>
                            <LikeBtnClick product={product} payload={payload} likes={likes} setLikes={setLikes}/>
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
                        <img src={getImageUrl(product.tastingImg)} alt="술테이스팅노트" className="tastingNote"/>
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
            <div>
                <DetailScrollToTop/>
            </div>
        </>
    )
}

export default DetailTraditional;