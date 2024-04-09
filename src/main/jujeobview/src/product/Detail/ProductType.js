import './ProductType.css';
function ProductType({ productId }) {
    console.log(productId);
    let alcType='';
    switch (productId){
        case "1":
            alcType = '맥주';
            break;
        case "2":
            alcType = '전통주';
            break;
        case "3":
            alcType = '와인';
            break;
        case "4":
            alcType = '위스키/기타';
            break;
    }
    return <h2 className="alcType">[{alcType}]</h2>;
}
export default ProductType;