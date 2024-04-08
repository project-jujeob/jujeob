import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";


function DetailTraditional({product}) {

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
                        </div>
                        <QuantityCounter/>

                        <div className="detailBtn">
                            <div>[예약]</div>
                            <div>
                                [찜]
                            </div>
                            <button className="cartBtn">장바구니 담기</button>
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
                        <div>[와인] {product.name}</div>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <img src={product.tastingImg} alt="술테이스팅노트" className="tastingNote"/>
                    </div>
                    <div className="detailContentInfo">
                        <p><span>색 | </span>{product.color}</p>
                        <p><span>향 | </span>{product.aroma}</p>
                        <p><span>품종 | </span>{product.kind}</p>
                        <p><span>오픈타입 | </span>{product.openType}</p>
                        <p><span>푸드 페어링 | </span>{product.foodPairing}</p>
                        <p><span>브리딩 및 시음 온도 | </span>{product.breeding}</p>
                        <p><span>추천 잔 | </span>{product.recommendGlass}</p>
                    </div>
                </div>
                <div className="detailBottom">
                    <div>
                        <p><span>와이너리 | </span>{product.winery}</p>
                        <p>{product.countryDescription}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailTraditional;