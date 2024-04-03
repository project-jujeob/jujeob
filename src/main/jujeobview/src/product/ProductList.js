import React from 'react';
import Header from "../common/Header";
import './ProductList.css';
import ProductListShow from "./ProductListShow";
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
            <div className="ProductList">
                <div className="ProductListSidebar">사이드바</div>
                <div className="ProductListShow"><ProductListShow /></div>
            </div>


        </div>
    );
}

export default ProductList;