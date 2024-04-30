import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {getImageUrl} from "../common/ImageUrl";

function ProductListRecommend() {
    const [productRecommendList, setProductRecommendList] = useState([]);

    useEffect(() => {
        axios.get('api/todayRecommend')
            .then((response)=>{
                setProductRecommendList(response.data);
            })
            .catch((error)=>{
                console.error('데이터 가져오기 실패:', error);
            })
    }, []);

    return (
        <div className="ProductRecommendContainer">
            <h2>오늘의 추천 주류</h2>
            <div className="ProductListRecommendItems">
                {productRecommendList.map((recommendList)=> (
                    <Link to={`/ProductItemDetail/${recommendList.productNo}`} className="link" key={recommendList.productNo}>
                        <div className="ProductRecommendItem">
                            <div className="ProductRecommendImg">
                                <img className="ProductRecommendImg" src={getImageUrl(recommendList.img)}
                                     alt={recommendList.name}/></div>
                            <div className="ProductRecommendName">{recommendList.name}</div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default ProductListRecommend;