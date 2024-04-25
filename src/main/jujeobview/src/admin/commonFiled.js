import React from "react";

export const commonFields = () => (
    <div className="CommonContainer">
        <div>
            <label htmlFor="name">상품명 </label>
            <input type="text" id="name" name="name"/>
        </div>
        <div>
            <label htmlFor="img">이미지 </label>
            <input type="file" id="img" name="img"/>
        </div>
        <div>
            <label htmlFor="price">가격 </label>
            <input type="text" id="price" name="price"/>
        </div>
        <div>
            <label htmlFor="stock">재고 </label>
            <input type="number" id="stock" name="stock"/>
        </div>
        <div>
            <label htmlFor="alcohol">도수 </label>
            <input type="text" id="alcohol" name="alcohol"/>
        </div>

        <div>
            <label htmlFor="volume">용량(ml) </label>
            <input type="text" id="volume" name="volume"/>
        </div>

        <div>
            <label htmlFor="type">타입 </label>
            <input type="text" id="type" name="type"/>
        </div>

        <div>
            <label htmlFor="description">상세설명 </label>
            <textarea id="description" name="description" rows="7"/>
        </div>

        <div>
            <label htmlFor="keyword">키워드 </label>
            <input type="text" id="keyword" name="keyword"/>
        </div>
    </div>
);