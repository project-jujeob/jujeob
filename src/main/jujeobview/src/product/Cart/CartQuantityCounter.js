import React, { useState } from "react";

function CartQuantityCounter({ initialQuantity, index, onQuantityChange }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    // index를 사용해서 decrease, increase일 때 부모 컴포넌트에 알려줌
    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            //updateLocalStorage(index, newQuantity);
            onQuantityChange(index, newQuantity);
        } else {
            alert('1보다 적은 수량은 입력할 수 없습니다');
        }
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        //updateLocalStorage(index, newQuantity);
        onQuantityChange(index, newQuantity);
    };

    return (
        <div className="quantity">
            <div>
                <button className="quantityBtn" onClick={decreaseQuantity}>–</button>
                <input type="text" className="quantityInput" value={quantity} readOnly />
                <button className="quantityBtn" onClick={increaseQuantity}>+</button>
            </div>
        </div>
    );
}

export default CartQuantityCounter;