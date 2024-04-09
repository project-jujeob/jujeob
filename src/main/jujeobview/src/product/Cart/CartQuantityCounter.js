import React, { useState } from "react";

function CartQuantityCounter({ initialQuantity, index }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateLocalStorage(newQuantity);
        }
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateLocalStorage(newQuantity);
    };

    const updateLocalStorage = (newQuantity) => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        cartItems[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
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
