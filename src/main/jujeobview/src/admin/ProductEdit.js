import React, {useEffect, useState} from "react";
import {commonFields} from "./commonFiled";
import {renderingFields} from "./renderingField";
import axios from "axios";
import {useParams} from "react-router-dom";

const ProductEdit = () => {
    const { productNo} = useParams();

    const alcoholTypeNames = {
        1: '맥주',
        2: '전통주',
        3: '와인',
        4: '위스키/기타',
    };

    const [productMainType, setProductMainType] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState(null);
    useEffect(() => {
        axios.get('/api/showProductMainType')
            .then((response) => {
                setProductMainType(response.data);
            })
            .catch((error) => {
                console.error('주종 목록 가져오기 실패:', error);
            })
        axios.get(`/api/getProductDetails/${productNo}`)
            .then((response) => {
                console.log(response.data);
                setSelectedMainType(response.data.productId);
            })
    }, []);


    return (
        <>
            <div>
                <div className="ProductRegistrationContainer">
                    <h2>상품 수정 페이지입니다</h2>
                    <form className="ProductRegistrationForm" >
                        <div className="MainTypeContainer">
                            <label htmlFor="MainType" className="MainType">주종 </label>
                            <div className="MainTypeButtons">
                                {productMainType.map((mainType) => (
                                    <button type="button"
                                            id="mainType"
                                            onClick={() => setSelectedMainType(mainType)}
                                            className={selectedMainType === mainType ? 'active' : ''}>
                                        {alcoholTypeNames[mainType]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="CommonFields">
                            {commonFields()}
                        </div>
                        <div className="RenderingFields">
                            {renderingFields(selectedMainType)}
                        </div>
                        <button type="submit">상품 수정</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ProductEdit;