import React, {useEffect, useRef, useState} from 'react';
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
    const [memberNo, setMemberNo] = useState(null);
    const [likes, setLikes] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // 로그인 상태 확인
    const checkLoginStatus = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        setIsLoggedIn(token != null);
        if (token != null) {
            const [, payloadBase64] = token.split(".");
            const payloadString = atob(payloadBase64);
            const payload = JSON.parse(payloadString);
            const userMemberNo = payload.memberNo;
            setMemberNo(userMemberNo);
        }
    };

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
        axios.post('/api/productListBySearch', {searchKeyword: searchKeyword})
            .then((productListBySearchKeyword) => {
                setSearchResult(productListBySearchKeyword.data);
                inputRef.current.focus();
                setSearchKeyword('');

            })
            .catch(error => {
                console.error('상품 검색 실패:', error);
            });
    }

    useEffect(() => {
        console.log(memberNo);
        if (isLoggedIn
            && memberNo !== null) {
            userLikes();
        }
    }, [isLoggedIn]);

    // 로그인한 사용자의 좋아요한 상품 확인
    const userLikes = async () => {
        console.log(memberNo);
        try {
            const checkedUserLike = await axios.post(`api/checkedUserLikes?memberNo=${memberNo}`)
            console.log(checkedUserLike.data);
            const likedProducts = checkedUserLike.data.reduce((acc, product) => {
                acc[product.productNo] = true;
                return acc;
            }, {});
            setLikes(likedProducts);
        } catch (error) {
            console.error('좋아요 목록 로딩 실패:', error);
        }
    };

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
                <ProductCategory searchResult={searchResult} searchKeyword={searchKeyword}
                                 memberNo={memberNo} likes={likes} isLoggedIn={isLoggedIn}
                                 setLikes={setLikes} userLikes={userLikes}
                />
            </div>
        </div>
    );
}

export default ProductList;