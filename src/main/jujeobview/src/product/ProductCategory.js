import './ProductList.css';
import {useEffect, useState} from "react";
import axios from "axios";

function ProductCategory() {
    const [productCategory, setProductCategory] = useState([]);

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
                      <button className="CategoryName">{category.categoryName}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCategory;