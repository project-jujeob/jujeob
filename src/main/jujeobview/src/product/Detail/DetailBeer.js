import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";


function DetailBeer({product}) {

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
                        <div>[맥주] {product.name}</div>
                    </div>
                    <div>
                    <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailBeer;