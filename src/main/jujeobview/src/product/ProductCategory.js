import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListShow from "./ProductListShow";
import resetIcon from '../img/icon/resetIcon.png';

function ProductCategory() {
    const [viewAllProductList, setViewAllProductList] = useState(0);
    const [productCategory, setProductCategory] = useState([]);
    const [subProductCategory, setProductSubCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);

    const [productMainType, setProductMainType] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState([]);
    const [currentMainType, setCurrentMainType] = useState([]); // 현재 선택된 주종 상태
    const [productTypes, setProductTypes] = useState({});
    const [checkedMainType, setCheckedMainType] = useState([]);
    const [checkedType, setCheckedType] = useState([]);
    const [alcoholLevels, setAlcoholLevels] = useState({
        level1: false,
        level2: false,
        level3: false,
        level4: false,
        level5: false,
    });
    const [checkedAlcoholLevel, setCheckedAlcoholLevel] = useState([]);
    const [prices, setPrices] = useState({
        price1: false,
        price2: false,
        price3: false,
        price4: false,
        price5: false,
        price6: false
    })
    const [checkedPrice, setCheckedPrice] = useState([]);

    // 주종에 대응하는 이름을 매핑하는 객체
    const alcoholTypeNames = {
        1: '맥주',
        2: '전통주',
        3: '와인',
        4: '위스키/기타',
    };

    const AllCategoryBtn = () => {
        setViewAllProductList(prev => prev + 1);
    };

    const CategoryBtn = (categoryNo) => {
        axios.post('api/selectedCategoryNo', { categoryNo : categoryNo })
            .then((response)=> {
                setSelectedCategory(response.data);
                // 상위 카테고리 선택 후 하위 카테고리 가져오기
                axios.get('api/subCategory', { params: { categoryNo: categoryNo } })
                    .then((subResponse)=>{
                        setProductSubCategory(subResponse.data);
                    })
                    .catch((error)=>{
                        console.error('데이터 가져오기 실패:', error);
                    })
            })
            .catch((error)=>{
                console.error('데이터 전송 실패:', error);
            })
    };

    const SubCategoryBtn = (subCategory) => {
        axios.post('api/selectedSubCategoryName', {subCategory : subCategory })
            .then((response) => {
                setSelectedSubCategory(response.data);
            })
            .catch((error)=>{
                console.error('데이터 전송 실패:', error);
            })
    }

    const MainTypeBtn = (mainType) => {
        let newMainTypes;
        if (currentMainType.includes(mainType)) {
            newMainTypes = currentMainType.filter(type => type !== mainType);
        } else {
            newMainTypes = [...currentMainType, mainType];
        }
        setCurrentMainType(newMainTypes);

        axios.post('api/selectedMainType', { mainType: newMainTypes })
            .then((response) => {
                setSelectedMainType(response.data);

                setProductTypes(prevProductTypes => {
                    const newProductTypes = {...prevProductTypes};
                    Object.values(response.data).flat().forEach(type => {
                        if (newProductTypes[type] === undefined) {
                            newProductTypes[type] = false;
                        }
                    });
                    return newProductTypes;
                });
                return axios.post('api/productListByMainType', { mainType : newMainTypes });
            })
            .then((productListByMainType) => {
                setCheckedMainType(productListByMainType.data);
            })
            .catch((error) => {
                console.error('요청 처리 중 에러 발생:', error);
            });
    };

    // 체크박스 상태를 변경하는 핸들러
    const handleTypeCheckboxChange = (type) => {
        setProductTypes(prevTypes => ({
            ...prevTypes,
            [type]: !prevTypes[type]
        }));
    };

    const handleAlcoholLevelCheckboxChange = (levelId) => {
        setAlcoholLevels(prevLevels => ({
            ...prevLevels,
            [levelId]: !prevLevels[levelId]
        }));
    };

    const handlePriceCheckboxChange = (priceId) => {
        setPrices(prevPrices => ({
            ...prevPrices,
            [priceId]: !prevPrices[priceId]
        }));
    };


    useEffect(() => {
        const checkedTypes = Object.keys(productTypes).filter(key => productTypes[key]);
        findProductListByTypes(checkedTypes);
    }, [productTypes]);

    // 사용자가 선택한 types 서버로 보내 상품 목록 조회하기
    const findProductListByTypes = (checkedTypes) => {
        axios.post('/api/productListByType', {
            types: checkedTypes
        })
            .then((productListByType) => {
                // 상품 목록 상태 업데이트 또는 다른 처리
                console.log(productListByType);
                setCheckedType(productListByType.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };

    useEffect(()=>{
        const checkedAlcoholLevels = Object.keys(alcoholLevels).filter(key => alcoholLevels[key]);
        findProductListByAlcoholLevels(checkedAlcoholLevels);
    }, [alcoholLevels]);

    const findProductListByAlcoholLevels = (checkedAlcoholLevels) => {
        axios.post('/api/productListByAlcoholLevel', {
            levels: checkedAlcoholLevels
        })
            .then((productListByAlcoholLevel) => {
                // 상품 목록 상태 업데이트 또는 다른 처리
                console.log(productListByAlcoholLevel.data);
                setCheckedAlcoholLevel(productListByAlcoholLevel.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };

    useEffect(()=>{
        const checkedPrices = Object.keys(prices).filter(key => prices[key]);
        findProductListByPrices(checkedPrices);
    }, [prices]);

    const findProductListByPrices = (checkedPrices) => {
        axios.post('/api/productListByPrice', {
            prices: checkedPrices
        })
            .then((productListByPrice) => {
                // 상품 목록 상태 업데이트 또는 다른 처리
                console.log(productListByPrice.data);
                setCheckedPrice(productListByPrice.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };


    // 체크박스 초기화
    const resetCheckBoxs = () => {
        setProductTypes(prevTypes => {
            const resetTypes = {};
            for (const type in prevTypes) {
                resetTypes[type] = false;
            }
            return resetTypes;
        })
        setAlcoholLevels(prevLevels => {
            const resetLevels = {};
            for (const level in prevLevels) {
                resetLevels[level] = false;
            }
            return resetLevels;
        });
        setPrices(prevPrices => {
            const resetPrices = {};
            for (const price in prevPrices) {
                resetPrices[price] = false;
            }
            return resetPrices;
        });
    };

    useEffect(() => {
        axios.get('api/category')
            .then((response)=>{
                setProductCategory(response.data);
            })
            .catch((error)=>{
                console.error('카테고리 가져오기 실패:', error);
            })
    }, []);

    useEffect(() => {
        axios.get('/api/showProductMainType')
            .then((response) => {
                setProductMainType(response.data);
            })
            .catch((error)=>{
                console.error('주종 목록 가져오기 실패:', error);
            })
    }, []);


    return (
        <div className="ProductCategory">
            <div className="CategoryList">
                <div className="CategoryItems">
                    <button className="AllCategory" onClick={AllCategoryBtn}>전체</button>
                    {productCategory.map((category) => (
                        <div className="CategoryItem" key={category.categoryNo}>
                            <button className="CategoryName"
                                    onClick={() => CategoryBtn(category.categoryNo)}>{category.categoryName}</button>
                        </div>
                    ))}
                </div>
                <div className="SubCategoryItems">
                    {selectedCategory && subProductCategory.map((subCategory) => (
                        <div className="SubCategoryItem" key={subCategory}>
                            <button className="SubCategoryName"
                                onClick={()=> SubCategoryBtn(subCategory)}># {subCategory}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ProductList">
                <div className="ProductListSidebar">
                    <div className="ProductListSidebarContainer">[ 사이드바 ]
                        <button className="SelectedReset" onClick={resetCheckBoxs}>
                            <img className="ResetIcon" src={resetIcon} alt={"초기화"}/>초기화</button>
                    </div>
                    <div className="ProductListSidebarSubContainer1">
                        <h4 className="ProductListSidebarAlcoholType">[주종]</h4>
                        {productMainType.map((mainType) => (
                            <React.Fragment key={mainType}>
                                <div className="alcoholTypeName" onClick={() => MainTypeBtn(mainType)}>
                                    {alcoholTypeNames[mainType]}
                                </div>
                                <div className="TypeContainer">
                                    {currentMainType.includes(mainType) && selectedMainType[mainType]?.map((type) => (
                                        <div className="TypeSubContainer" key={type}>
                                            <label htmlFor={`TypeCheckBox-${type}`} className="TypeCheckBoxContainer">
                                                <input
                                                    className="TypeCheckBox"
                                                    id={`TypeCheckBox-${type}`} key={type}
                                                    type="checkbox"
                                                    checked={productTypes[type] || false}
                                                    onChange={() => handleTypeCheckboxChange(type)}
                                                /> {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="ProductListSidebarSubContainer2">
                        <h4 className="ProductListSidebarAlcoholLevel">[도수]</h4>
                        <div className="AlcoholLevelContainer">
                            <label className="LevelCheckBoxContainer" htmlFor="level1">
                                <input type="checkbox" id="level1" className="LevelCheckBox" onChange={() => handleAlcoholLevelCheckboxChange('level1')}/> 5도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level2">
                                <input type="checkbox" id="level2" className="LevelCheckBox" onChange={() => handleAlcoholLevelCheckboxChange('level2')}/> 6도 ~ 15도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level3">
                                <input type="checkbox" id="level3" className="LevelCheckBox" onChange={() => handleAlcoholLevelCheckboxChange('level3')}/> 16도 ~ 30도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level4">
                                <input type="checkbox" id="level4" className="LevelCheckBox" onChange={() => handleAlcoholLevelCheckboxChange('level4')}/> 31도 ~ 50도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level5">
                                <input type="checkbox" id="level5" className="LevelCheckBox" onChange={() => handleAlcoholLevelCheckboxChange('level5')}/> 51도 이상
                            </label>
                        </div>
                    </div>
                    <div className="ProductListSidebarSubContainer3">
                        <h4 className="ProductListSidebarPrice">[가격]</h4>
                        <div className="PriceContainer">
                            <label className="PriceCheckBoxContainer" htmlFor="price1">
                                <input type="checkbox" id="price1" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price1')}/> 7,000원 미만
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price2">
                                <input type="checkbox" id="price2" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price2')}/> 7,000원 ~ 30,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price3">
                                <input type="checkbox" id="price3" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price3')}/> 30,000원 ~ 70,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price4">
                                <input type="checkbox" id="price4" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price4')}/> 70,000원 ~ 100,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price5">
                                <input type="checkbox" id="price5" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price5')}/> 100,000원 ~ 200,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price6">
                                <input type="checkbox" id="price6" className="PriceCheckBox" onChange={() => handlePriceCheckboxChange('price6')}/> 200,000원 이상
                            </label>
                        </div>
                    </div>
                    <div className="ProductListSidebarSubContainer4">
                        <h4 className="ProductListPopularity">[인기순]</h4>
                    </div>
                    <div className="ProductListSidebarSubContainer5">
                        <h4 className="ProductListNew">[최신순]</h4>
                    </div>

                </div>
                <div className="ProductListShow">
                    <ProductListShow selectedCategory={selectedCategory}
                                     selectedSubCategory={selectedSubCategory}
                                     viewAllProductList={viewAllProductList}
                                     onViewAll={AllCategoryBtn}
                                     checkedMainType={checkedMainType}
                                     checkedType={checkedType}
                                     checkedAlcoholLevel={checkedAlcoholLevel}
                                     checkedPrice={checkedPrice}/>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;