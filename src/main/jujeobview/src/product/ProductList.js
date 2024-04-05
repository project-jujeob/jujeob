import React from 'react';
import Header from "../common/Header";
import './ProductList.css';
import ProductListRecommend from "./ProductListRecommend";
import ProductCategory from "./ProductCategory";

function ProductList() {
    return (
        <div className="ProductListConatainer">
            <Header />
            <div className="ProductRecommendList">
                <ProductListRecommend />
            </div>
            <div className="ProductCategory">
                <ProductCategory />
            </div>
        </div>
    );
}

export default ProductList;