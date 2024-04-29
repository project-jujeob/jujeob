import React, {useEffect, useState} from "react";
import {commonFields} from "./commonFiled";
import {renderingFields} from "./renderingField";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const ProductEdit = () => {
    const navigate = useNavigate();
    const { productNo} = useParams();
    const [productDetails, setProductDetails] = useState({}); // 상품 상태 저장
    const [file, setFile] = useState(null);  // 파일 상태 추가
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBrandImg, setSelectedBrandImg] = useState(null);
    const [selectedDetailImg, setSelectedDetailImg] = useState(null);
    const [selectedTastingImg, setSelectedTastingImg] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            // 입력 필드의 이름에 따라 적절한 state 업데이트
            switch (event.target.name) {
                case 'img':
                    setSelectedImage(imageUrl);
                    break;
                case 'brandImg':
                    setSelectedBrandImg(imageUrl);
                    break;
                case 'detailImg':
                    setSelectedDetailImg(imageUrl);
                    break;
                case 'tastingImg':
                    setSelectedTastingImg(imageUrl);
                    break;
                default:
                    break;
            }

            // 상품 상세 정보 업데이트
            setProductDetails(prevDetails => ({
                ...prevDetails,
                [event.target.name]: file
            }));
        }
    };

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
                setProductDetails(response.data);
            })
    }, [productNo]);

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productEditInfo = {
            productNo: productNo,
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
        console.log(productEditInfo);
        axios.post('/api/updateProductDetails', productEditInfo , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response)=>{
                alert("상품 수정이 완료되었습니다.")
                window.location.reload();
            }).catch(error => {
            alert("상품 수정에 실패하였습니다.")
            console.log(error);
        })
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    return (
        <>
            <div>
                <div className="ProductEditContainer">
                    <h2>상품 수정 페이지입니다</h2>
                    <form className="ProductEditForm" onSubmit={handleSubmitEditForm}>
                        <div className="MainTypeContainer">
                            <label htmlFor="MainType" className="MainType">주종 </label>
                            <div className="MainTypeButtons">
                                {productMainType.map((mainType) => (
                                    <button key={mainType.id}
                                            type="button"
                                            id="mainType"
                                            onClick={() => setSelectedMainType(mainType)}
                                            className={selectedMainType === mainType ? 'active' : ''}>
                                        {alcoholTypeNames[mainType]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="CommonFields">
                            {commonFields(productDetails, setProductDetails, handleFileChange, selectedImage)}
                        </div>
                        <div className="RenderingFields">
                            {renderingFields(selectedMainType, productDetails, setProductDetails, selectedImage)}
                        </div>
                        <div className="ProductEditBtns">
                            <button type="submit">상품 수정</button>
                            <button type="button" onClick={handleCancel}>뒤로</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ProductEdit;