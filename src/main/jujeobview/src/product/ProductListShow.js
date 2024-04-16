import './ProductList.css';
import React, {useState, useEffect, useRef} from "react";
import Pagination from '../common/Pagination';
import {Link} from "react-router-dom";
import likeIcon from '../img/icon/likeIcon.png';
import basketIcon from '../img/icon/basketIcon.png';
import addToCart from "./Cart/addToCart";
import LikeProduct from "./Like/LikeProduct";

function ProductListShow({selectedSubCategoryData, selectedCategoryData, viewAllProductList,
                             ProductListByFilterOption, searchResult}) {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [memberNo, setMemberNo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    useEffect(() => {
        checkLoginStatus();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 로그인 상태 확인
    const checkLoginStatus = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        setIsLoggedIn(token != null);

        if (token != null) {
            const [, payloadBase64] = token.split(".");
            const payloadString = atob(payloadBase64);
            const payload = JSON.parse(payloadString);
            console.log(payload);
            const userMemberNo = payload.memberNo;
            setMemberNo(userMemberNo);
        }
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

    const handleClick = (e, product) => {
        e.preventDefault();
        addToCart(product);
    };

    const likeBtnClick = (e, product, memberNo) => {
        e.preventDefault();
        if(isLoggedIn) {
            LikeProduct(product, memberNo);
        } else {
            alert("로그인한 사용자만 가능합니다!");
        }
    }

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
                                                     onClick={(e)=> likeBtnClick(e, product, memberNo)}>
                                                    <img src={likeIcon}/>
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