import React from 'react';
import axios from 'axios';

function ProductListOrderBy({ setProductList }) {
    const OrderByBtn = (orderByBtnType) => {
        console.log(orderByBtnType);
        axios.post('api/productListByOrderBy', { orderByBtnType: orderByBtnType })
            .then((productListByOrderBy) => {
                setProductList(productListByOrderBy.data);
            }).catch(error => {
            console.error('정렬버튼별 상품 조회 실패:', error);
        });
    };

    return (
        <div className="ProductListOrderBy">
            <div className="ProductListOrderByLike" id="orderLike"
                 onClick={() => OrderByBtn('orderLike')}>좋아요순
            </div>
            <div className="ProductListOrderByReview" id="orderReview"
                 onClick={() => OrderByBtn('orderReview')}>리뷰많은순
            </div>
            <div className="productListOrderByLowPrice" id="orderLowPrice"
                 onClick={() => OrderByBtn('orderLowPrice')}>가격낮은순
            </div>
            <div className="ProductListOrderByHighPrice" id="orderHighPrice"
                 onClick={() => OrderByBtn('orderHighPrice')}>높은가격순
            </div>
        </div>
    );
}

export default ProductListOrderBy;
