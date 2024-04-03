import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProductList.css';
import ProductList from "./ProductList";
import Pagination from "./Pagination";

function ProductListShow() {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('/api/productList')
            .then((response) => {
                setProductList(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    }, []);

    // 아이템 리스트에서 현재 페이지에 해당하는 아이템들을 가져오는 함수
    const getCurrentItems = () => {
        const itemsPerPage = 9; // 한 페이지당 아이템 수
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return productList.slice(indexOfFirstItem, indexOfLastItem);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="ProductListShowContainer">
            {/* 아이템 리스트 */}
            <ProductList items={getCurrentItems()} />
            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage}
                totalItems={productList.length}
                itemsPerPage={9}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ProductListShow;
