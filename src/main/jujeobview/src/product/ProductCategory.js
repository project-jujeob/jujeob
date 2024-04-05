import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListShow from "./ProductListShow";

function ProductCategory() {
    const [productCategory, setProductCategory] = useState([]);
    const [subProductCategory, setProductSubCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);

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

    useEffect(() => {
        axios.get('api/category')
            .then((response)=>{
                setProductCategory(response.data);
            })
            .catch((error)=>{
                console.error('카테고리 가져오기 실패:', error);
            })
    }, []);

    return (
        <div className="ProductCategory">
            <div className="CategoryList">
                <div className="CategoryItems">
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
                <div className="ProductListSidebar">사이드바</div>
                <div className="ProductListShow">
                    <ProductListShow selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory}/>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;