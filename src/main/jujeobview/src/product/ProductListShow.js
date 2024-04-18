import './ProductList.css';
import React, {useState, useEffect, useRef} from "react";
import Pagination from '../common/Pagination';

import addToCart from "./Cart/addToCart";
import axios from "axios";
import {useAuth} from "../member/Context";
import LikeBtnClick from "./Like/LikeBtnClick";
import ProductItem from "./ProductItem";

function ProductListShow({selectedSubCategoryData, selectedCategoryData, viewAllProductList,
                             ProductListByFilterOption, searchResult}) {
    const { payload } = useAuth();
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [likes, setLikes] = useState({});

    useEffect(() => {
        if (viewAllProductList) {
            setProductList(viewAllProductList);
            setCurrentPage(1);
        }
    }, [viewAllProductList]);

    useEffect(() => {
        if (selectedSubCategoryData) {
            setProductList(selectedSubCategoryData);
            setCurrentPage(1);
        }
    }, [selectedSubCategoryData]);

    useEffect(() => {
        if (selectedCategoryData) {
            setProductList(selectedCategoryData);
            setCurrentPage(1);
        }
    }, [selectedCategoryData]);

    useEffect(() => {
        if (ProductListByFilterOption) {
            setProductList(ProductListByFilterOption);
            setCurrentPage(1);
        }
    }, [ProductListByFilterOption]);

    useEffect(() => {
        if (searchResult) {
            setProductList(searchResult);
            setCurrentPage(1);
        }
    }, [searchResult]);

    useEffect(() => {
        if (payload && payload.memberNo) {
            userLikes();
        }
    }, [payload]);

    // 로그인한 사용자의 좋아요한 상품 확인
    const userLikes = () => {
        axios.post(`api/checkedUserLikes?memberNo=${payload.memberNo}`)
            .then(checkedUserLike => {
                const updatedLikes = checkedUserLike.data.reduce((acc, item) => {
                    acc[item.productId] = item.likeStatus === 'Y';
                    return acc;
                }, {});
                setLikes(updatedLikes);
            })
            .catch(error => {
                console.error('좋아요 목록 로딩 실패:', error);
            });
    };


    const itemsPerPage = 9;
    const itemsPerRow = 3;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    // 각 행에 대한 배열로 나누기
    const rows = [];
    for (let i = 0; i < currentItems.length; i += itemsPerRow) {
        rows.push(currentItems.slice(i, i + itemsPerRow));
     }


    const OrderByBtn = (orderByBtnType) => {
        console.log(orderByBtnType);
        axios.post('api/productListByOrderBy', {orderByBtnType : orderByBtnType})
            .then((productListByOrderBy) => {
                setProductList(productListByOrderBy.data);
            }).catch(error => {
            console.error('정렬버튼별 상품 조회 실패:', error);
        });
    }

    return (
        <div className="ProductListShowContainer">
            <div className="ProductListShowHeader">
                <div className="ProductListCount">총 : {productList.length} 건</div>
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
            </div>
            <div className="ProductItems">
                {productList.length > 0 ? (
                    rows.map((row, index) => (
                        <div key={index} className="ProductRow">
                            {row.map(product => (
                                <ProductItem
                                    key={product.productNo}
                                    product={product}
                                    payload={payload}
                                    likes={likes}
                                    setLikes={setLikes}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="NoProductList">조회된 상품이 없습니다.</div>
                )}
            </div>
            <Pagination
                totalItems={productList.length}
                itemsPerPage={itemsPerPage}
                pageCount={5}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                start={indexOfFirstItem + 1}
            />
        </div>
    );
}

export default ProductListShow;