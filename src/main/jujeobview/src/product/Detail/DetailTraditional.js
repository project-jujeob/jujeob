import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";
import {useState} from "react";


function DetailTraditional({product}) {
    const [cartQuantity, setCartQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product,cartQuantity);
    };

    const handleQuantityChange = (newQuantity) => {
        setCartQuantity(newQuantity);
    }

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
                            <p><span>포장타입&ensp;:&ensp;</span> {product.packageType}</p>
                            <p><span>도수&ensp;:&ensp;</span> {product.alcohol}</p>
                            <p><span>용량&ensp;:&ensp;</span> {product.volume}</p>
                            <p><span>소비기한&ensp;:&ensp;</span> {product.expDate}</p>
                            <p><span>추천 검색어&ensp;:&ensp;</span> {product.keyword}</p>
                            <p><span>구매수량 : &ensp;</span><QuantityCounter/></p>
                        </div>

                        <div className="detailBtn">
                            <div>[예약]</div>
                            <div>
                                [찜]
                            </div>
                            <button className="cartBtn" onClick={handleAddToCart}>장바구니 담기</button>
                        </div>
                    </div>
                </div>
                <div className="detailContent">
                    <div className="detailContentBtn">
                        <div>상세정보</div>
                        <div>후기</div>
                        <div>상품문의</div>
                    </div>
                    <div className="detailContentImg">
                        <img src={product.detailImg} alt="술디테일이미지"/>
                    </div>
                    <div className="detailContentTop">
                        <div>[전통주] {product.name}</div>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <img src={product.tastingImg} alt="술테이스팅노트" className="tastingNote"/>
                    </div>
                    <div className="detailContentInfo">
                        <p><span>색&균질도 | </span>{product.colorAndHomogeneity}</p>
                        <p><span>향 | </span>{product.incense}</p>
                        <p><span>맛 | </span>{product.tasting}</p>
                        <p><span>목넘김 | </span>{product.mouthfeel}</p>
                    </div>
                </div>
                <div className="detailBottom">
                    <img src={product.brandImg} alt="술브랜드이미지"/>
                </div>
            </div>
        </>
    )
}

export default DetailTraditional;