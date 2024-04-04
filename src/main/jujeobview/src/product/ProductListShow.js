import '../common/ProductList.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '../common/Pagination';
import {Link} from "react-router-dom";

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

    const itemsPerPage = 9;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="ProductListShowContainer">
            <div className="ProductItems">
                {currentItems.map((product) => (
                    <Link key={product.productNo} to={`/ProductItemDetail/${product.productNo}` }>
                        <div className="ProductItem" key={product.productNo} >
                            <div className="ProductImg"><img src={product.img} alt={product.name} /></div>
                            <div className="ProductName">{product.name}</div>
                            <div className="ProductDescription">{product.description.length > 18 ? `${product.description.substring(0, 18)}...` : product.description}</div>
                            <div className="ProductAlcohol">{product.alcohol}</div>
                            <div className="ProductPrice">{product.price}</div>
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination
                totalItems={productList.length}
                itemsPerPage={itemsPerPage}
                pageCount={5}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                start={indexOfFirstItem + 1} // 현재 페이지의 첫 번째 아이템 인덱스를 전달합니다.
            />
        </div>
    );
}

export default ProductListShow;