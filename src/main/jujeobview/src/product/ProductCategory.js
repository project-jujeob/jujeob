import './ProductList.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductListShow from "./ProductListShow";

function ProductCategory() {
    const [productCategory, setProductCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const CategoryBtn = (categoryNo) => {
        axios.post('api/categoryNo', { categoryNo : categoryNo })
            .then((response)=>{
                console.log(response);
                setSelectedCategory(response.data);
            })
            .catch((error)=>{
                console.error('데이터 가져오기 실패:', error);
            })
    };

    useEffect(() => {
        axios.get('api/category')
            .then((response)=>{
                setProductCategory(response.data);
            })
            .catch((error)=>{
                console.error('데이터 가져오기 실패:', error);
            })
    }, []);
    return (
        <div className="ProductCategory">
            <div className="CategoryItems">
                {productCategory.map((category) => (
                    <div className="CategoryItem" key={category.categoryNo}>
                        <button type="submit" className="CategoryName"
                                onClick={() => CategoryBtn(category.categoryNo)}>{category.categoryName}</button>
                    </div>
                ))}
            </div>
            <div className="ProductList">
                <div className="ProductListSidebar">사이드바</div>
                <div className="ProductListShow"><ProductListShow selectedCategory={selectedCategory} /></div>
            </div>
        </div>
    );
}

export default ProductCategory;