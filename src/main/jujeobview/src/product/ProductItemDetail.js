import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import './ProductDetail.css';

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
        <>
            <Header/>
            <div className="detailContainer">
                <div className="detailTop">
                    <div>
                        <img src={product.img} className="detailImgthumb"/>
                    </div>
                    <div>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>Alcohol: {product.alcohol}</p>
                        <p>Price: {product.price}</p>
                        <p>Keyword:{product.keyword}</p>
                    </div>
                </div>
                <div className="detailContent">
                    여기가 내용+상세정보
                </div>
                <div className="detailBottom">
                    
                </div>
            </div>

        </>
    );
}

export default ProductItemDetail;
