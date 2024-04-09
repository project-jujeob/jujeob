import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListShow from "./ProductListShow";
import resetIcon from '../img/icon/resetIcon.png';

function ProductCategory() {
    const [viewAll, setViewAll] = useState(0);
    const [productCategory, setProductCategory] = useState([]);
    const [subProductCategory, setProductSubCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);

    const [productMainType, setProductMainType] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState([]);
    const [currentMainType, setCurrentMainType] = useState([]); // 현재 선택된 주종 상태
    const [checkedTypes, setCheckedTypes] = useState({});
    const [checkedMainType, setCheckedMainType] = useState([]);


    // 주종에 대응하는 이름을 매핑하는 객체
    const alcoholTypeNames = {
        1: '맥주',
        2: '전통주',
        3: '와인',
        4: '위스키/기타',
    };

    const AllCategoryBtn = () => {
        setViewAll(prev => prev + 1);
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

                setCheckedTypes(prevCheckedTypes => {
                    const newCheckedTypes = {...prevCheckedTypes};
                    Object.values(response.data).flat().forEach(type => {
                        if (newCheckedTypes[type] === undefined) {
                            newCheckedTypes[type] = false;
                        }
                    });
                    return newCheckedTypes;
                });
                return axios.post('api/productListByMainType', { mainType : newMainTypes });
            })
            .then((productListByMainType) => {
                console.log(productListByMainType.data);
                setCheckedMainType(productListByMainType.data);
            })
            .catch((error) => {
                console.error('요청 처리 중 에러 발생:', error);
            });
    };

    // 체크박스 상태를 변경하는 핸들러
    const handleCheckboxChange = (type) => {
        setCheckedTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
        axios.post('/api/updateCheckBoxState',  {
            type : type,
            isChecked : !checkedTypes[type]
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error)=>{
                console.error('체크박스 상태 업데이트 실패:', error);
            })
    };

    // 체크박스 초기화
    const resetCheckBoxs = () => {
        setCheckedTypes(prevTypes => {
            const resetTypes = {};
            for (const type in prevTypes) {
                resetTypes[type] = false;
            }
            return resetTypes;
        })
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
                            <img className="ResetIcon" src={resetIcon}/>초기화</button>
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
                                                    checked={checkedTypes[type] || false}
                                                    onChange={() => handleCheckboxChange(type)}
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
                            <label className="LevelCheckBoxContainer" htmlFor="LevelCheckBox">
                                <input type="checkbox" id="LevelCheckBox" className="LevelCheckBox"/> 5도 이하
                            </label>
                            <label className="LevelCheckBoxContainer">
                                <input type="checkbox" id="LevelCheckBox" className="LevelCheckBox"/> 6도 ~ 15도 이하
                            </label>
                            <label className="LevelCheckBoxContainer">
                                <input type="checkbox" id="LevelCheckBox" className="LevelCheckBox"/> 16도 ~ 30도 이하
                            </label>
                            <label className="LevelCheckBoxContainer">
                                <input type="checkbox" id="LevelCheckBox" className="LevelCheckBox"/> 30도 이상
                            </label>
                        </div>
                    </div>
                    <div className="ProductListSidebarSubContainer3">
                        <h4 className="ProductListSidebarPrice">[가격]</h4>
                        <div className="PriceContainer">
                            <label className="PriceCheckBoxContainer" htmlFor="PriceCheckBox">
                                <input type="checkbox" id="PriceCheckBox" className="PriceCheckBox"/> 5도 이하
                            </label>
                            <label className="PriceCheckBoxContainer">
                                <input type="checkbox" id="PriceCheckBox" className="PriceCheckBox"/> 6도 ~ 15도 이하
                            </label>
                            <label className="PriceCheckBoxContainer">
                                <input type="checkbox" id="PriceCheckBox" className="PriceCheckBox"/> 16도 ~ 30도 이하
                            </label>
                            <label className="PriceCheckBoxContainer">
                                <input type="checkbox" id="PriceCheckBox" className="PriceCheckBox"/> 31도 ~ 50도 이하
                            </label>
                            <label className="PriceCheckBoxContainer">
                                <input type="checkbox" id="PriceCheckBox" className="PriceCheckBox"/> 51도 이상
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
                                     viewAll={viewAll}
                                     onViewAll={AllCategoryBtn}
                                     checkedMainType={checkedMainType}/>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;