import './ProductList.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProductList.css';

function ProductListShow() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('/api/productList')
            .then((response) => {
                setProductList(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    return (
        <div className="ProductListShowContainer">
            <div className="ProductItems">
                {productList.map((product) => (
                    <div className="ProductItem" key={product.productNo}>
                        <div className="ProductImg"><img src={product.img}/></div>
                        <div className="ProductName">{product.name}</div>
                        <div
                            className="ProductDescription">{product.description.length > 18 ? `${product.description.substring(0, 18)}...` : product.description}</div>
                        <div className="ProductAlchol">{product.alcohol}</div>
                        <div className="ProductPrice">{product.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductListShow;
