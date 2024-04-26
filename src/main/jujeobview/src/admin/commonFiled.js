import React from "react";
import {getImageUrl} from "../common/ImageUrl";

export const commonFields = (productDetails, setProductDetails, handleFileChange, selectedImage) => (
    <div className="CommonContainer">
        <div>
            <label htmlFor="name">상품명 </label>
            <input type="text" id="name" name="name"
                   value={productDetails.name || ''}
                   onChange={(e) => setProductDetails({...productDetails, name: e.target.value})}
                   placeholder="상품 이름을 입력해주세요"/>

        </div>
        <div>
            <label htmlFor="img">이미지 </label>
            <span>
                 {selectedImage ? (
                     <img src={selectedImage} alt="Product" style={{width: '130px', height: '100px'}}/>
                 ) : productDetails.img && (
                     <img src={getImageUrl(productDetails.img)} alt="Product" style={{width: '25%', height: '200px'}}/>
                 )}
                <input type="file" id="img" name="img" onChange={handleFileChange} className="ProductImgUpload"/>
            </span>
        </div>
        <div>
            <label htmlFor="price">가격 </label>
            <input type="text" id="price" name="price"
                   value={productDetails.price || ''}
                   onChange={(e) => setProductDetails({...productDetails, price: e.target.value})}
                   placeholder="숫자만 입력해주세요"/>
        </div>
        <div>
        <label htmlFor="stock">재고 </label>
            <input type="number" id="stock" name="stock"
                   value={productDetails.quantity || ''}
                   onChange={(e) => setProductDetails({...productDetails, quantity: e.target.value})}
                   placeholder="숫자만 입력해주세요"/>
        </div>
        <div>
            <label htmlFor="alcohol">도수 </label>
            <input type="text" id="alcohol" name="alcohol"
                   value={productDetails.alcohol || ''}
                   onChange={(e) => setProductDetails({...productDetails, alcohol: e.target.value})}
                   placeholder="숫자만 입력해주세요"/>
        </div>

        <div>
            <label htmlFor="volume">용량(ml) </label>
            <input type="text" id="volume" name="volume"
                   value={productDetails.volume || ''}
                   onChange={(e) => setProductDetails({...productDetails, volume: e.target.value})}
                   placeholder="ml까지 입력해주세요"/>
        </div>

        <div>
            <label htmlFor="type">타입 </label>
            <input type="text" id="type" name="type"
                   value={productDetails.type || ''}
                   onChange={(e) => setProductDetails({...productDetails, type: e.target.value})}
                   placeholder="주종에 맞게 type을 입력해주세요"/>
        </div>

        <div>
            <label htmlFor="description">상세설명 </label>
            <textarea id="description" name="description" rows="7"
                      value={productDetails.description || ''}
                      onChange={(e) => setProductDetails({...productDetails, description: e.target.value})}
                      placeholder="상품의 상세 설명을 입력해주세요"/>
        </div>

        <div>
            <label htmlFor="keyword">키워드 </label>
            <input type="text" id="keyword" name="keyword"
                   value={productDetails.keyword || ''}
                   onChange={(e) => setProductDetails({...productDetails, keyword: e.target.value})}
                   placeholder="하위 카테고리에 포함되는 내용만 입력해주세요. 여러 개일 경우 ',' 넣어주세요"/>
        </div>
    </div>
);