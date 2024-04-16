import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListShow from "./ProductListShow";
import resetIcon from '../img/icon/resetIcon.png';

function ProductCategory({searchResult, searchKeyword}) {
    const [viewAllProductList, setViewAllProductList] = useState(0);
    const [viewAllBtn, setViewAllBtn] = useState(false);
    const [productCategory, setProductCategory] = useState([]);
    const [subProductCategory, setProductSubCategory] = useState([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState([]);
    const [selectedSubCategoryData, setSelectedSubCategoryData] = useState([]);
    const [selectedCategoryNo, setSelectedCategoryNo] = useState([]);
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState([]);
    const [ProductListByFilterOption, setProductListByFilterOption] = useState([]);


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

    // 전체 버튼 클릭시 실행되는 함수
    const AllCategoryBtn = () => {
        setViewAllProductList(prev => prev + 1);
        setViewAllBtn(true);
        // 카테고리 선택 상태 초기화
        setSelectedCategoryNo(null);
        setSelectedSubCategoryName(null);

        // 데이터 초기화
        setSelectedCategoryData([]);
        setSelectedSubCategoryData([]);
        setProductSubCategory([]);
        setProductListByFilterOption([]);

        showAll();
    };

    // 전체 제품 목록을 불러오는 함수
    const showAll = () => {
        axios.get('/api/productList')
            .then(response => {
                setViewAllProductList(response.data);
            })
            .catch(error => {
                console.error('데이터 가져오기 실패:', error);
            });
    };

    // 페이지 로드 시 실행되는 로직
    useEffect(() => {
        // 전체 버튼 클릭
        AllCategoryBtn();
        // 전체 제품 목록 불러오기
        showAll();
    }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때만 실행되도록 함

    useEffect(() => {
        // 이곳에서 초기화 로직을 실행합니다.
        resetCheckBoxs(); // 체크박스 초기화
        setViewAllBtn(true);
        // 카테고리 선택 상태 초기화
        setSelectedCategoryNo(null);
        setSelectedSubCategoryName(null);
    }, [searchResult]);


    // 필터링 상품조회
    const submitAllSelections = () => {
        const selections = {
            keyword: [searchKeyword],
            category: [selectedCategoryNo],
            subCategory: [selectedSubCategoryName],
            mainType: currentMainType,
            types: Object.keys(productTypes).filter(key => productTypes[key]),
            alcoholLevels: Object.keys(alcoholLevels).filter(key => alcoholLevels[key]),
            prices: Object.keys(prices).filter(key => prices[key]),
        };
         axios.post('/api/submitSelections', selections)
            .then(response => {
                console.log(selections);
                console.log('서버 응답:', response.data);
                setProductListByFilterOption(response.data);

                // 추가적인 처리 작업 진행
            })
            .catch(error => {
                console.error('서버 전송 실패:', error);
            });
    };

    // 상위 카테고리 선택 후 그에 해당하는 하위 카테고리 항목 조회
    const CategoryBtn = (categoryNo) => {
        if (selectedCategoryNo === categoryNo) {
            setSelectedCategoryNo(null);
            setSelectedCategoryData([]);
            setProductSubCategory([]);
            setViewAllBtn(false);
        } else {
            setSelectedCategoryNo(categoryNo);
            fetchCategoryData(categoryNo);
            setViewAllBtn(false);
        }
    };

    // 상위 카테고리 데이터를 불러오는 함수
    const fetchCategoryData = (categoryNo) => {
        axios.post('api/selectedCategoryNo', { categoryNo })
            .then((response) => {
                setSelectedCategoryData(response.data);
                // 하위 카테고리 데이터 가져오기
                fetchSubCategoryData(categoryNo);
            })
            .catch((error) => {
                console.error('상위 카테고리 데이터 가져오기 실패:', error);
            });
    };

    // 하위 카테고리 데이터를 불러오는 함수
    const fetchSubCategoryData = (categoryNo) => {
        axios.get('api/subCategory', { params: { categoryNo } })
            .then((subResponse) => {
                setProductSubCategory(subResponse.data);
            })
            .catch((error) => {
                console.error('하위 카테고리 데이터 가져오기 실패:', error);
            });
    };


    // 하위 카테고리 버튼 클릭 시 해당 데이터 조회
    const SubCategoryBtn = (subCategory) => {
        if (selectedSubCategoryName === subCategory) {
            setViewAllBtn(false);
            setSelectedSubCategoryName(null); // 선택 해제
            setSelectedSubCategoryData([]); // 관련 데이터 초기화
            // 상위 카테고리 데이터를 다시 불러옴
            fetchCategoryData(selectedCategoryNo);
        } else {
            setSelectedSubCategoryName(subCategory);
            axios.post('api/selectedSubCategoryName', { subCategory: subCategory })
                .then((response) => {
                    setSelectedSubCategoryData(response.data);
                })
                .catch((error) => {
                    console.error('데이터 전송 실패:', error);
                });
        }
    };

    // 주종 버튼 클릭 시 해당 데이터 조회
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
        setAlcoholLevels(prevLevels => {
            return {
                ...prevLevels,
                [levelId]: !prevLevels[levelId]
            };
        });
    };

    const handlePriceCheckboxChange = (priceId) => {
        setPrices(prevPrices => ({
            ...prevPrices,
            [priceId]: !prevPrices[priceId]
        }));
    };

    // type 체크박스 상태 변화시 해당 하는 데이터 조회
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
                setCheckedType(productListByType.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };

    // 도수 체크박스 상태 변화시 해당 하는 데이터 조회
    useEffect(()=>{
        const checkedAlcoholLevels = Object.keys(alcoholLevels).filter(key => alcoholLevels[key]);
        findProductListByAlcoholLevels(checkedAlcoholLevels);
    }, [alcoholLevels]);

    const findProductListByAlcoholLevels = (checkedAlcoholLevels) => {
        axios.post('/api/productListByAlcoholLevel', {
            levels: checkedAlcoholLevels
        })
            .then((productListByAlcoholLevel) => {
                setCheckedAlcoholLevel(productListByAlcoholLevel.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };
    
    // 가격 체크박스 상태 변화시 해당 하는 데이터 조회
    useEffect(()=>{
        const checkedPrices = Object.keys(prices).filter(key => prices[key]);
        findProductListByPrices(checkedPrices);
    }, [prices]);

    const findProductListByPrices = (checkedPrices) => {
        axios.post('/api/productListByPrice', {
            prices: checkedPrices
        })
            .then((productListByPrice) => {
                setCheckedPrice(productListByPrice.data);
            })
            .catch(error => {
                console.error('상품 조회 실패:', error);
            });
    };

    // 체크박스 초기화
    const resetCheckBoxs = () => {
        // 주종 관련 상태 초기화
        setCurrentMainType([]);
        setSelectedMainType([]);

        // 모든 주종에 대한 타입 체크박스 상태를 초기화
        setProductTypes(prevProductTypes => {
            const resetTypes = {};
            Object.keys(prevProductTypes).forEach(type => {
                resetTypes[type] = false;
            });
            return resetTypes;
        });

        setAlcoholLevels({
            level1: false,
            level2: false,
            level3: false,
            level4: false,
            level5: false,
        });

        // 가격별 체크박스 초기화
        setPrices({
            price1: false,
            price2: false,
            price3: false,
            price4: false,
            price5: false,
            price6: false
        });

        // 모든 검증된 데이터 목록 초기화
        setCheckedType([]);
        setCheckedMainType([]);
        setCheckedAlcoholLevel([]);
        setCheckedPrice([]);
    };


    // 카테고리 항목 조회 ( 날씨별, 기분별, 상황별, 이벤트별, 기타 )
    useEffect(() => {
        axios.get('api/category')
            .then((response)=>{
                setProductCategory(response.data);
            })
            .catch((error)=>{
                console.error('카테고리 가져오기 실패:', error);
            })
    }, []);

    // 주종 항목 조회 ( 1: 맥주, 2: 전통주, 3: 와인, 4: 위스키/기타 )
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
                    <button className={`AllCategory ${viewAllBtn ? 'clicked' : ''}`}
                            onClick={AllCategoryBtn}>전체</button>
                    {productCategory.map((category) => (
                        <div className="CategoryItem" key={category.categoryNo}>
                            <button
                                className={`CategoryName ${selectedCategoryNo === category.categoryNo ? 'selected' : ''}`}
                                onClick={() => CategoryBtn(category.categoryNo)}>{category.categoryName}</button>
                        </div>
                    ))}
                </div>
                <div className="SubCategoryItems">
                    {selectedCategoryData && subProductCategory.map((subCategory) => (
                        <div className="SubCategoryItem" key={subCategory}>
                            <button
                                className={`SubCategoryName ${selectedSubCategoryName === subCategory ? 'selected' : ''}`}
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
                    <div className="FilterBtn">
                        <button className="CheckBoxSubmitButton" onClick={submitAllSelections}>필터 검색</button>
                    </div>
                    <div className="ProductListSidebarSubContainer1">
                    <h4 className="ProductListSidebarAlcoholType">[주종]</h4>
                        {productMainType.map((mainType) => (
                            <React.Fragment key={mainType}>
                                <div
                                    className={`alcoholTypeName ${currentMainType.includes(mainType) ? 'selected' : ''}`}
                                    onClick={() => MainTypeBtn(mainType)}>
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
                                <input type="checkbox" id="level1" className="LevelCheckBox" checked={alcoholLevels.level1}
                                       onChange={() => handleAlcoholLevelCheckboxChange('level1')}/> 5도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level2">
                                <input type="checkbox" id="level2" className="LevelCheckBox" checked={alcoholLevels.level2}
                                       onChange={() => handleAlcoholLevelCheckboxChange('level2')}/> 6도 ~ 15도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level3">
                                <input type="checkbox" id="level3" className="LevelCheckBox" checked={alcoholLevels.level3}
                                       onChange={() => handleAlcoholLevelCheckboxChange('level3')}/> 16도 ~ 30도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level4">
                                <input type="checkbox" id="level4" className="LevelCheckBox" checked={alcoholLevels.level4}
                                       onChange={() => handleAlcoholLevelCheckboxChange('level4')}/> 31도 ~ 50도 이하
                            </label>
                            <label className="LevelCheckBoxContainer" htmlFor="level5">
                                <input type="checkbox" id="level5" className="LevelCheckBox" checked={alcoholLevels.level5}
                                       onChange={() => handleAlcoholLevelCheckboxChange('level5')}/> 51도 이상
                            </label>
                        </div>
                    </div>
                    <div className="ProductListSidebarSubContainer3">
                        <h4 className="ProductListSidebarPrice">[가격]</h4>
                        <div className="PriceContainer">
                            <label className="PriceCheckBoxContainer" htmlFor="price1">
                                <input type="checkbox" id="price1" className="PriceCheckBox" checked={prices.price1}
                                       onChange={() => handlePriceCheckboxChange('price1')}/> 7,000원 미만
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price2">
                                <input type="checkbox" id="price2" className="PriceCheckBox" checked={prices.price2}
                                       onChange={() => handlePriceCheckboxChange('price2')}/> 7,000원 ~ 30,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price3">
                                <input type="checkbox" id="price3" className="PriceCheckBox" checked={prices.price3}
                                       onChange={() => handlePriceCheckboxChange('price3')}/> 30,000원 ~ 70,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price4">
                                <input type="checkbox" id="price4" className="PriceCheckBox" checked={prices.price4}
                                       onChange={() => handlePriceCheckboxChange('price4')}/> 70,000원 ~ 100,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price5">
                                <input type="checkbox" id="price5" className="PriceCheckBox" checked={prices.price5}
                                       onChange={() => handlePriceCheckboxChange('price5')}/> 100,000원 ~ 200,000원
                            </label>
                            <label className="PriceCheckBoxContainer" htmlFor="price6">
                                <input type="checkbox" id="price6" className="PriceCheckBox" checked={prices.price6}
                                       onChange={() => handlePriceCheckboxChange('price6')}/> 200,000원 이상
                            </label>
                        </div>
                    </div>

                </div>
                <div className="ProductListShow">
                    <ProductListShow selectedCategoryData={selectedCategoryData}
                                     selectedSubCategoryData={selectedSubCategoryData}
                                     viewAllProductList={viewAllProductList}
                                     onViewAll={AllCategoryBtn}
                                     checkedMainType={checkedMainType}
                                     checkedType={checkedType}
                                     checkedAlcoholLevel={checkedAlcoholLevel}
                                     checkedPrice={checkedPrice}
                                     ProductListByFilterOption={ProductListByFilterOption}
                                     searchResult={searchResult}/>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;