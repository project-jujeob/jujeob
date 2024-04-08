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
            <div className="quantity">
                <p><span>구매수량 : &ensp;</span></p>
                <div>
                    <button className="quantityBtn" onClick={decreaseQuantity}>–</button>
                    <input type="text" className="quantityInput" value={quantity} readOnly/>
                    <button className="quantityBtn" onClick={increaseQuantity}>+</button>
                </div>
            </div>
        </div>
    )
}

export default QuantityCounter;