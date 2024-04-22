import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import React, {useRef, useState} from "react";
import DetailScrollToTarget from "./DetailScrollToTarget";
import ReviewPage from "./review/ReviewPage";
import {useAuth} from "../../member/Context";
import LikeBtnClick from "../Like/LikeBtnClick";
import useCheckUserLikes from "../Like/useCheckUserLikes";
import DetailScrollToTop from "./DetailScrollToTop";

function DetailBeer({product}) {
    const { payload } = useAuth();
    const [cartQuantity, setCartQuantity] = useState(1); // 장바구니에 추가될 수량 상태
    const [likes, setLikes] = useCheckUserLikes(payload?.memberNo);

    const handleQuantityChange = (newQuantity) => {
        setCartQuantity(newQuantity); // 수량 변경 시 장바구니에 추가될 수량 업데이트
    };

    const handleAddToCart = () => {
        console.log("카트수량"+cartQuantity);
        addToCart(product,payload.memberNo,cartQuantity);
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
                        <h2>{product.price.toLocaleString()}원</h2>
                        <div className="detailRightSpan">
                            <p><span>종류&ensp;:&ensp;</span> {product.type}</p>
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
            <div>
                <DetailScrollToTop/>
            </div>
        </>
    )
}

export default DetailBeer;