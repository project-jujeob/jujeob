import './ProductList.css';
import React, {useState, useEffect, useRef} from "react";
import Pagination from '../common/Pagination';
import {Link} from "react-router-dom";
import likeIcon from '../img/icon/likeIcon.png';
import likeIconChecked from '../img/icon/likeIconChecked.png';
import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";
import LikeProduct from "./Like/LikeProduct";

function ProductListShow({selectedSubCategoryData, selectedCategoryData, viewAllProductList,
                             ProductListByFilterOption, searchResult, likes, setLikes, memberNo, isLoggedIn}) {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if (viewAllProductList) {
            setProductList(viewAllProductList);
        }
    }, [viewAllProductList]);

    useEffect(() => {
        if (selectedSubCategoryData) {
            setProductList(selectedSubCategoryData);
        }
    }, [selectedSubCategoryData]);

    useEffect(() => {
        if (selectedCategoryData) {
            setProductList(selectedCategoryData);
        }
    }, [selectedCategoryData]);

    useEffect(() => {
        if (ProductListByFilterOption) {
            setProductList(ProductListByFilterOption);
        }
    }, [ProductListByFilterOption]);

    useEffect(() => {
        if (searchResult) {
            setProductList(searchResult);
        }
    }, [searchResult]);


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

    const handleClick = (e, product) => {
        e.preventDefault();
        addToCart(product);
    };

    const likeBtnClick = (e, product, memberNo) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }

        const isLiked = !likes[product.productNo];
        // UI를 즉시 업데이트
        const newLikes = { ...likes, [product.productNo]: isLiked };
        setLikes(newLikes);

        // 백엔드에 변경 사항 반영
        LikeProduct(product, memberNo, isLiked);
    };


    return (
        <div className="ProductListShowContainer">
            <div className="ProductListShowHeader">
                <div className="ProductListCount">상품 수 : {productList.length} 개</div>
            </div>
            <div className="ProductItems">
                {productList.length > 0 ? (
                    rows.map((row, index) => (
                        <div key={index} className="ProductRow">
                            {row.map((product) => (
                                <div key={product.productNo} className="ProductItem">
                                    <Link to={`/ProductItemDetail/${product.productNo}`} className="link">
                                        <div className="ProductImgContainer">
                                            <img className="ProductImg" src={product.img} alt={product.name}/>
                                            <div className="ProductBtns">
                                                <div className="ProductLikeBtn"
                                                     onClick={(e) => likeBtnClick(e, product, memberNo)}>
                                                    <img src={likes[product.productNo] ? likeIconChecked : likeIcon}
                                                         alt="Like Button"/>
                                                </div>
                                                <div className="ProductBasketBtn"
                                                     onClick={(e) => handleClick(e, product)}>
                                                    <img src={basketIcon}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ProductName">{product.name}</div>
                                        <div
                                            className="ProductDescription">{product.description.length > 18 ? `${product.description.substring(0, 18)}...` : product.description}</div>
                                        <div className="ProductAlcohol">{product.alcohol}%</div>
                                        <div className="ProductPrice">{product.price.toLocaleString()}원</div>
                                    </Link>
                                </div>
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