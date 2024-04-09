import {useState} from "react";

function QuantityCounter({onQuantityChange}){
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if(quantity > 1){
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };


    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };


    return(
        <div>
            <div className="quantity">
                <div>
                    <button className="quantityBtn" onClick={decreaseQuantity}>–</button>
                    <input type="text" className="quantityInput" value={quantity}
                           onChange={handleQuantityChange} min={1} readOnly/>
                    <button className="quantityBtn" onClick={increaseQuantity}>+</button>
                </div>
            </div>
        </div>
    )
}

export default QuantityCounter;