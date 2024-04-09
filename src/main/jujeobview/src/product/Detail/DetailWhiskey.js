import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import addToCart from "../Cart/addToCart";


function DetailTraditional({product}) {

    const handleAddToCart = () => {
        addToCart(product);
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
                    <div className="detailContentTop">
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
                <div className="detailBottom">
                    <div>
                        <p><span>향 | </span>{product.aroma}</p>
                        <p><span>맛 | </span>{product.flavor}</p>
                        <p><span>여운 | </span>{product.finish}</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailTraditional;