import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import './ProductItemDetail.css';
import DetailBeer from "./DetailBeer";
import DetailTraditional from "./DetailTraditional";
import DetailWine from "./DetailWine";
import DetailWhiskey from "./DetailWhiskey";

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
            componentToShow = <DetailTraditional product={product}/>;
            break;
        case "3":
            componentToShow = <DetailWine product={product}/>;
            break;
        case "4":
            componentToShow = <DetailWhiskey product={product}/>;
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