import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import './ProductItemDetail.css';
import ProductType from "./ProductType";
import QuantityCounter from "./QuantityCounter";
import MainPage from "../MainPage";
import ProductList from "./ProductList";
import DetailBeer from "./Detail/DetailBeer";

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

    let componentToShow = null;

    switch (product.productId) {
        case "1":
            componentToShow = <DetailBeer product={product}/>;
            break;
        case "2":
            componentToShow = <MainPage />;
            break;
        default:
            componentToShow = null;
    }


    return (
        <div className="detailContainer">
            <Header/>

            <div>
                {componentToShow}
            </div>

        </div>
    );
}

export default ProductItemDetail;
