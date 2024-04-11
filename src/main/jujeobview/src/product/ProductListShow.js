import './ProductList.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '../common/Pagination';
import {Link} from "react-router-dom";
import likeIcon from '../img/icon/likeIcon.png';
import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";

function ProductListShow({selectedCategory, selectedSubCategory, viewAllProductList, checkedMainType, checkedType, checkedAlcoholLevel, checkedPrice}) {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const showAll = () => {
        axios.get('/api/productList')
            .then(response => {
                setProductList(response.data);
            })
            .catch(error => {
                console.error('데이터 가져오기 실패:', error);
            });
    }

    // 페이지 로드 시 실행되는 로직
    useEffect(() => {
       showAll();
    }, []);


    useEffect(() => {
        if (viewAllProductList) {
            showAll();
        }
    }, [viewAllProductList]);


    useEffect(() => {
        if (selectedCategory) {
            setProductList(selectedCategory);
        } 
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedSubCategory) {
            setProductList(selectedSubCategory);
        }
    }, [selectedSubCategory]);

    useEffect(() => {
        if (checkedMainType) {
            setProductList(checkedMainType);
        }
    }, [checkedMainType]);

    useEffect(() => {
        if (checkedType) {
            setProductList(checkedType);
        }
    }, [checkedType]);

    useEffect(() => {
        if (checkedAlcoholLevel) {
            setProductList(checkedAlcoholLevel);
        }
    }, [checkedAlcoholLevel]);

    useEffect(() => {
        if (checkedPrice) {
            setProductList(checkedPrice);
        }
    }, [checkedPrice]);

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
                                                <div className="ProductLikeBtn"><img src={likeIcon}/></div>
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