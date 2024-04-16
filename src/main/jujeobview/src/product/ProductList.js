import React, {useRef, useState} from 'react';
import Header from "../common/Header";
import './ProductList.css';
import ProductListRecommend from "./ProductListRecommend";
import ProductCategory from "./ProductCategory";
import axios from "axios";
import searchIcon from "../img/icon/searchIcon.png";

function ProductList() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const inputRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);

    const searchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const submitSearchKeyword = (event) => {
        event.preventDefault();
        if (!searchKeyword.trim()) {
            alert('검색어를 입력해주세요');
            inputRef.current.focus();
            setSearchKeyword('');
            return;
        }
        axios.post('/api/productListBySearch', { searchKeyword:searchKeyword })
            .then((productListBySearchKeyword)=>{
                setSearchResult(productListBySearchKeyword.data);
                inputRef.current.focus();
                setSearchKeyword('');

            })
            .catch(error => {
                console.error('상품 검색 실패:', error);
            });
    }

    return (
        <div className="ProductListContainer">
            <Header/>
            <div className="ProductListSearch">
                <form onSubmit={submitSearchKeyword}>
                    <input
                        className="SearchInput"
                        type="text"
                        placeholder="검색어를 입력해주세요"
                        value={searchKeyword}
                        onChange={searchChange}
                        ref={inputRef}
                    />
                    <button className="ProductSearchBtn" type="submit">
                        <i className="SearchIcon"><img src={searchIcon} alt={"검색"}/></i>
                    </button>
                </form>
            </div>
            <div className="ProductRecommendList">
                <ProductListRecommend/>
            </div>
            <div className="ProductCategory">
                <ProductCategory searchResult={searchResult} searchKeyword={searchKeyword}/>
            </div>
        </div>
    );
}

export default ProductList;