import ProductType from "../ProductType";
import QuantityCounter from "../QuantityCounter";


function DetailBeer({product}) {

    return(
        <>
            <div className="detail">
                <div className="detailTop">
                    <div>
                        <img src={product.img} className="detailImgthumb"/>
                    </div>
                    <div className="detailRight">
                        <ProductType productId={product.productId}/>
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                        <p>종류&ensp;:&ensp; {product.type}</p>
                        <p>판매자&ensp;:&ensp; {product.company}</p>
                        <p>도수&ensp;:&ensp; {product.alcohol}</p>
                        <p>용량&ensp;:&ensp; {product.volume}</p>
                        <p>추천 검색어&ensp;:&ensp;{product.keyword}</p>
                        <QuantityCounter/>

                        <button className="cartBtn">장바구니 담기</button>

                    </div>
                </div>
                <div className="detailContent">
                    <div>
                        [맥주] {product.name}
                    </div>
                    <div>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div className="detailBottom">
                    디테일 컨텐츠 아래 부분
                </div>
            </div>
        </>
    )
}

export default DetailBeer;