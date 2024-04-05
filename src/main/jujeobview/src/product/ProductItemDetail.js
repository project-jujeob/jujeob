import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import './ProductItemDetail.css';
import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";

function ProductItemDetail() {
    const { productNo } = useParams();
    const [product, setProduct] = useState(null);

    console.log("productNo:", productNo);

    useEffect(() => {
        if (productNo) { // productNo가 존재할 때만 요청을 보냅니다.
            axios.get(`/api/productDetail/${productNo}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    console.error('데이터 가져오기 실패:', error);
                });
        }
    }, [productNo]);

    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="detailContainer">
            <Header/>
            <div className="detail">
                <div className="detailTop">
                    <div>
                        <img src={product.img} className="detailImgthumb"/>
                    </div>
                    <div>
                        <ProductType productId={product.productId}/>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>가격: {product.price}</p>
                        <p>도수: {product.alcohol}</p>
                        <p>추천 검색어:{product.keyword}</p>
                        <QuantityCounter/>
                        {/*<button> - </button>
                        {' '}
                        <button> + </button>*/}
                    </div>
                </div>
                <div className="detailContent">
                    여기가 내용+상세정보
                </div>
                <div className="detailBottom">
                    
                </div>
            </div>

        </div>
    );
}

export default ProductItemDetail;
