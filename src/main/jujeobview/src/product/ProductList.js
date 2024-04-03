import React from 'react';
import Header from "../common/Header";
import './ProductList.css';
import ProductListShow from "./ProductListShow";

function ProductList() {
    return (
        <div className="ProductListConatainer">
            <Header />
            <div className="ProductListTitle">
                <h2>오늘의 추천 주류</h2>
            </div>
            <div className="ProductListCategory">
                <h2>날씨별/ 기분별 / ...</h2>
            </div>
            <div className="ProductList">
                <div className="ProductListSidebar">사이드바</div>
                <div className="ProductListShow"><ProductListShow /></div>
            </div>


        </div>
    );
}

export default ProductList;