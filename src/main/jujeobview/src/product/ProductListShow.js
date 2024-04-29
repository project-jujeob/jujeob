import './ProductList.css';
import React, {useState, useEffect} from "react";
import Pagination from '../common/Pagination';
import ProductItem from "./ProductItem";
import {useAuth} from "../user/Context";
import useCheckUserLikes from "./Like/useCheckUserLikes";
import {useLocation, useParams} from "react-router-dom";

function ProductListShow({selectedSubCategoryData, selectedCategoryData, viewAllProductList,
                             ProductListByFilterOption, searchResult, selectOrderOption}) {
    const { payload } = useAuth();
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [likes, setLikes] = useCheckUserLikes(payload?.userNo);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') ;

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
        if(selectOrderOption) {
            setProductList(selectOrderOption);
            setCurrentPage(1);
        }
    }, [selectOrderOption]);

    const itemsPerPage = 9;
    const itemsPerRow = 3;

    const handlePageChange = (page) => {
        //console.log(page)
        setCurrentPage(page);
    };

    useEffect(() =>{
        if(page > 0) {
            console.log(page)
            setCurrentPage(page);
        }
    },[])


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

    // 각 행에 대한 배열로 나누기
    const rows = [];
    for (let i = 0; i < currentItems.length; i += itemsPerRow) {
        rows.push(currentItems.slice(i, i + itemsPerRow));
    }

    return (
        <div className="ProductListShowContainer">
            <div className="ProductListShowHeader">
                <div className="ProductListCount">총 : {productList.length} 건</div>
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