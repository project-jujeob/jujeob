import {useState} from "react";

function QuantityCounter(){
    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity-1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return(
        <div>
            <div className="quantity-input">
                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                <input type="text" className="quantity" value={quantity} readOnly />
                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
        </div>
    )
}
export default QuantityCounter;