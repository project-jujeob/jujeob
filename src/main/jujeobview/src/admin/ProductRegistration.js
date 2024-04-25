import React, {useEffect, useState} from 'react';
import Header from "../common/Header";
import axios from "axios";
import './Admin.css';

const ProductRegistration = () => {
    const alcoholTypeNames = {
        1: '맥주',
        2: '전통주',
        3: '와인',
        4: '위스키/기타',
    };

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
    const commonFields = () => (
        <div className="CommonContainer">
            <div>
                <label htmlFor="name">상품명 </label>
                <input type="text" id="name" name="name"/>
            </div>
            <div>
                <label htmlFor="img">이미지 </label>
                <input type="file" id="img" name="img"/>
            </div>
            <div>
                <label htmlFor="price">가격 </label>
                <input type="text" id="price" name="price"/>
            </div>
            <div>
                <label htmlFor="stock">재고 </label>
                <input type="number" id="stock" name="stock"/>
            </div>
            <div>
                <label htmlFor="alcohol">도수 </label>
                <input type="text" id="alcohol" name="alcohol"/>
            </div>

            <div>
                <label htmlFor="volume">용량(ml) </label>
                <input type="text" id="volume" name="volume"/>
            </div>

            <div>
                <label htmlFor="type">타입 </label>
                <input type="text" id="type" name="type"/>
            </div>

            <div>
                <label htmlFor="description">상세설명 </label>
                <textarea id="description" name="description" rows="7"/>
            </div>

            <div>
                <label htmlFor="keyword">키워드 </label>
                <input type="text" id="keyword" name="keyword"/>
            </div>
        </div>
    );

    const renderingFields = () => {
        switch (selectedMainType) {
            case '1':
                return (
                    <div>
                        {/*나중에 맥주 전용 값 생기면 추가하기*/}
                    </div>
                );
            case
            '2'
            :
                return (
                    <div className="TraditionalContainer">
                        <label htmlFor="company">회사 </label>
                        <input type="text" id="company" name="company"/>

                        <label htmlFor="packageType">포장 </label>
                        <input type="text" id="packageType" name="packageType"/>

                        <label htmlFor="unit">개수 </label>
                        <input type="text" id="unit" name="unit"/>

                        <label htmlFor="detailImg">상세이미지 </label>
                        <input type="file" id="detailImg" name="detailImg" accept="image/*"/>

                        <label htmlFor="tastingImg">테이스팅이미지 </label>
                        <input type="file" id="tastingImg" name="tastingImg"/>

                        <label htmlFor="colorAndHomogeneity">색&균질성 </label>
                        <input type="text" id="colorAndHomogeneity" name="colorAndHomogeneity"/>

                        <label htmlFor="incense">향 </label>
                        <input type="text" id="incense" name="incense"/>

                        <label htmlFor="tasting">맛 </label>
                        <input type="text" id="tasting" name="tasting"/>

                        <label htmlFor="mouthfeel">목넘김 </label>
                        <input type="text" id="mouthfeel" name="mouthfeel"/>

                        <label htmlFor="brandImg">상표 </label>
                        <input type="text" id="brandImg" name="brandImg"/>
                    </div>
                );
            case '3':
                return (
                    <div className="WineContainer">
                        <label htmlFor="company">회사 </label>
                        <input type="text" id="company" name="company"/>

                        <label htmlFor="tastingimg">테이스팅이미지 </label>
                        <input type="file" id="tastingimg" name="tastingimg"/>

                        <label htmlFor="winery">와이너리 </label>
                        <input type="text" id="winery" name="winery"/>

                        <label htmlFor="kind">포도종류 </label>
                        <input type="text" id="kind" name="kind"/>

                        <label htmlFor="color">색 </label>
                        <input type="text" id="color" name="color"/>

                        <label htmlFor="openType">오픈타입 </label>
                        <input type="text" id="openType" name="openType"/>

                        <label htmlFor="aroma">아로마 </label>
                        <input type="text" id="aroma" name="aroma"/>

                        <label htmlFor="foodPairing">푸드페어링 </label>
                        <input type="text" id="foodPairing" name="foodPairing"/>

                        <label htmlFor="breeding">브리딩 </label>
                        <input type="text" id="breeding" name="breeding"/>

                        <label htmlFor="recommendGlass">추천잔 </label>
                        <input type="text" id="recommendGlass" name="recommendGlass"/>

                        <label htmlFor="country">국가 </label>
                        <input type="text" id="country" name="country"/>

                        <label htmlFor="countryDescription">국가설명 </label>
                        <textarea id="countryDescription" name="countryDescription" rows="5"></textarea>
                    </div>
                );
            case '4':
                return (
                    <div>
                        <label htmlFor="company">회사 </label>
                        <input type="text" id="company" name="company"/>

                        <label htmlFor="tastingImg">테이스팅이미지 </label>
                        <input type="file" id="tastingImg" name="tastingImg"/>

                        <label htmlFor="aroma">아로마 </label>
                        <input type="text" id="aroma" name="aroma"/>

                        <label htmlFor="country">국가 </label>
                        <input type="text" id="country" name="country"/>

                        <label htmlFor="brand">브랜드 </label>
                        <input type="text" id="brand" name="brand"/>

                        <label htmlFor="crate">박스여부 </label>
                        <input type="text" id="crate" name="crate"/>

                        <label htmlFor="howToDrink">음용법 </label>
                        <input type="text" id="howToDrink" name="howToDrink"/>

                        <label htmlFor="flavor">플레이버 </label>
                        <input type="text" id="flavor" name="flavor"/>

                        <label htmlFor="finish">피니시 </label>
                        <input type="text" id="finish" name="finish"/>
                    </div>

                );
        }
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
            }).catch(error => {
                alert("상품 등록에 실패하였습니다.")
                console.log(error);
        })
    }

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
                        {commonFields()}
                    </div>
                    <div className="RenderingFields">
                        {renderingFields()}
                    </div>
                    <button type="submit">상품 등록</button>
                </form>
            </div>
        </div>
    );
};

export default ProductRegistration;