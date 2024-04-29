import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import React, {useRef, useState} from "react";
import DetailScrollToTarget from "./DetailScrollToTarget";
import ReviewPage from "./review/ReviewPage";
import DetailScrollToTop from "./DetailScrollToTop";
import {useAuth} from "../../user/Context";
import LikeBtnClick from "../Like/LikeBtnClick";
import useCheckUserLikes from "../Like/useCheckUserLikes";
import {getImageUrl} from "../../common/ImageUrl";


function DetailTraditional({product}) {
    const { payload } = useAuth();

    const [likes, setLikes] = useCheckUserLikes(payload?.userNo);
    const [cartQuantity, setCartQuantity] = useState(1);

    const handleAddToCart = () => {
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
                            <p><span>포장타입&ensp;:&ensp;</span> {product.packageType}</p>
                            <p><span>도수&ensp;:&ensp;</span> {product.alcohol}%</p>
                            <p><span>용량&ensp;:&ensp;</span> {product.volume}</p>
                            <p><span>소비기한&ensp;:&ensp;</span> {product.expDate}</p>
                            <p><span>추천 검색어&ensp;:&ensp;</span> {product.keyword}</p>
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
                    <div className="detailContentImg" ref={contentTopRef}>
                        <img src={getImageUrl(product.detailImg)} alt="술디테일이미지"/>
                    </div>
                    <div className="detailContentTop">
                        <div>[전통주] {product.name}</div>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <img src={getImageUrl(product.tastingImg)} alt="술테이스팅노트" className="tastingNote"/>
                    </div>
                    <div className="detailContentInfo">
                        <p><span>색&균질도 | </span>{product.colorAndHomogeneity}</p>
                        <p><span>향 | </span>{product.incense}</p>
                        <p><span>맛 | </span>{product.tasting}</p>
                        <p><span>목넘김 | </span>{product.mouthfeel}</p>
                    </div>
                </div>
                <div className="detailBottom" ref={bottomRef}>
                    <img src={getImageUrl(product.brandImg)} alt="술브랜드이미지"/>
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