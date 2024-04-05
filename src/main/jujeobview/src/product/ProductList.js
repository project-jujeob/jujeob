import React from 'react';
import Header from "../common/Header";
import './ProductList.css';
import ProductListShow from "./ProductListShow";
import ProductListRecommend from "./ProductListRecommend";
import ProductCategory from "./ProductCategory";

function ProductList() {
    return (
        <div className="ProductListContainer">
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