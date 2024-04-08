import React, { useState, useEffect } from 'react';

// 로컬 스토리지에서 상품 정보를 불러옴
const getCartItems = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
};

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // 페이지가 로드될 때 로컬 스토리지에서 장바구니 정보를 가져옴
        const items = getCartItems();
        setCartItems(items);

        // 총 가격 계산
        const totalPrice = items.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotalPrice(totalPrice);
    }, []);

    // 장바구니 삭제
    const removeItemFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // 삭제 후 총 가격 업데이트
        const totalPrice = updatedCart.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
        setTotalPrice(totalPrice);
    };

    return (
        <div>
            <h2>장바구니</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <button onClick={() => removeItemFromCart(index)}>제거</button>
                    </li>
                ))}
            </ul>
            <div>
                총 가격: {totalPrice.toLocaleString()} 원
            </div>
        </div>
    );
}

export default Cart;
