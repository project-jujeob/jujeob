import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

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
                    <div className="ProductRecommendItem" key={recommendList.productNo}>
                        <div className="ProductRecommendImg"><img src={recommendList.img}/></div>
                        <div className="ProductRecommendName">{recommendList.name}</div>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default ProductListRecommend;