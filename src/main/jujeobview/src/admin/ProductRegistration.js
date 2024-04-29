import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Admin.css';
import {commonFields} from './commonFiled';
import {renderingFields} from './renderingField';

const ProductRegistration = () => {
    const alcoholTypeNames = {
        1: '맥주',
        2: '전통주',
        3: '와인',
        4: '위스키/기타',
    };

    const [productDetails, setProductDetails] = useState({
        name: '',
        img: '',
        price: '',
        stock: '',
        alcohol: '',
        volume: '',
        type: '',
        description: '',
        keyword: '',
        company: '',
        packageType: '',
        unit: '',
        expDate: '',
        detailImg: '',
        tastingImg: '',
        colorAndHomogeneity: '',
        incense: '',
        tasting: '',
        mouthfeel: '',
        brandImg: '',
        winery: '',
        kind: '',
        color: '',
        openType: '',
        aroma: '',
        foodPairing: '',
        breeding: '',
        recommendGlass: '',
        country: '',
        countryDescription: '',
        brand: '',
        crate: '',
        howToDrink: '',
        flavor: '',
        finish: '',
    });

    const [productMainType, setProductMainType] = useState([]);
    useEffect(() => {
        axios.get('/api/showProductMainType')
            .then((response) => {
                setProductMainType(response.data);
            })
            .catch((error) => {
                console.error('주종 목록 가져오기 실패:', error);
            })
    }, []);


    const [selectedMainType, setSelectedMainType] = useState(null);

    const handleChange = (name, value) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmitRegisterForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productInfo = {
            productId: selectedMainType,
            name: formData.get('name'),
            img: formData.get('img'),
            price: formData.get('price'),
            quantity:formData.get('stock'),
            alcohol: formData.get('alcohol'),
            volume: formData.get('volume'),
            type: formData.get('type'),
            description: formData.get('description'),
            keyword: formData.get('keyword'),
            company: formData.get('company'),
            packageType: formData.get('packageType'),
            unit: formData.get('unit'),
            expDate: formData.get('expDate'),
            detailImg : formData.get('detailImg'),
            tastingImg : formData.get('tastingImg'),
            colorAndHomogeneity : formData.get('colorAndHomogeneity'),
            incense : formData.get('incense'),
            tasting : formData.get('tasting'),
            mouthfeel : formData.get('mouthfeel'),
            brandImg : formData.get('brandImg'),
            winery : formData.get('winery'),
            kind : formData.get('kind'),
            color : formData.get('color'),
            openType : formData.get('openType'),
            aroma : formData.get('aroma'),
            foodPairing : formData.get('foodPairing'),
            breeding : formData.get('breeding'),
            recommendGlass : formData.get('recommendGlass'),
            country : formData.get('country'),
            countryDescription : formData.get('countryDescription'),
            brand : formData.get('brand'),
            crate : formData.get('crate'),
            howToDrink : formData.get('howToDrink'),
            flavor : formData.get('flavor'),
            finish : formData.get('finish'),
        }
        console.log(productInfo);
        axios.post('api/registerProduct', productInfo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response)=>{
                console.log(response.data);
                alert("상품 등록이 완료되었습니다.")
                window.location.reload();
            }).catch(error => {
            alert("상품 등록에 실패하였습니다.")
            console.log(error);
        })
    };

    return (
        <div>
            <div className="ProductRegistrationContainer">
                <form className="ProductRegistrationForm" onSubmit={handleSubmitRegisterForm}>
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
                        {commonFields(productDetails, handleChange)}
                    </div>
                    <div className="RenderingFields">
                        {renderingFields(selectedMainType, productDetails, handleChange)}
                    </div>
                    <button type="submit">상품 등록</button>
                </form>
            </div>
        </div>
    );
};

export default ProductRegistration;