import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../common/Pagination";
import {getImageUrl} from "../common/ImageUrl";
import './Admin.css';
import {useNavigate} from "react-router-dom";

const PAGE_SIZE = 10;

const ProductManagement = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용


    const [totalProduct, setTotalProduct] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('/api/getProductListForAdmin')
            .then((response) => {
                setProductList(response.data);
                setTotalProduct(response.data.length);
                setTotalPages(Math.ceil(totalProduct / PAGE_SIZE));
            }).catch((error) => {
            console.log('회원 목록 가져오기 실패:', error);
        })
    }, []);

    useEffect(() => {
        loadProductList();
    }, [currentPage]);

    const loadProductList = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        axios.get('/api/getProductListForAdmin')
            .then((response) => {
                setProductList(response.data.slice(startIndex, endIndex));
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNavigation = (productNo) => {
        navigate(`/ProductEdit/${productNo}`);
    };

    const deleteProduct = (productNo) =>  {
        axios.post('api/productDelete', {productNo})
            .then((response) => {
                alert(productNo + "번 상품이 삭제되었습니다.");
                loadProductList();
            }).catch((error) => {
            console.log('공지사항 삭제 실패:', error);
        })
    }

    return (
        <div>
            <div className="ProductAdminContainer">
                <div className="ProductAdminList">
                    <div className="ProductAdminListHeader">
                        <div className="ProductAdminNo">NO.</div>
                        <div className="productAdminImg">상품이미지</div>
                        <div className="productAdminName">상품명</div>
                        <div className="productAdminPrice">가격</div>
                        <div className="productAdminStock">재고</div>
                        <div className="productAdminBtns"></div>
                    </div>
                    {productList.map((product, index) => (
                        <div className="ProductAdminListContent" key={index}>
                            <div className="ProductAdminNo">{product.productNo}</div>
                            <div className="productAdminImg">
                                <img className="ProductImg" src={getImageUrl(product.img)} alt={product.name}/>
                            </div>
                            <div className="productAdminName">{product.name}</div>
                            <div className="productAdminPrice">{product.price}</div>
                            <div className="productAdminStock">{product.quantity}</div>
                            <div className="productAdminBtns">
                                <button onClick={() => handleNavigation(product.productNo)}>수정</button>
                                <button onClick={() => deleteProduct(product.productNo)}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                totalItems={totalProduct}
                itemsPerPage={PAGE_SIZE}
                pageCount={5}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ProductManagement;