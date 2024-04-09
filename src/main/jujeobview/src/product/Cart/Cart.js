import React, { useState, useEffect } from 'react';
import Header from "../../common/Header";
import './Cart.css';
import CartQuantityCounter from "./CartQuantityCounter";

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
        const totalPrice = items.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
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
            <Header/>

            <div className="cartContainer">
                <div className="cartTitle">
                    <h1>장바구니</h1>
                </div>
                <div className="cartContentList">
                    <div className="cartTotalChecked">{/*전체선택버튼만들기*/}
                        <div className="cartCheckTotalBox">
                            <input type="checkbox"/>전체선택(선택개수/총개수) | 선택삭제버튼
                        </div>


                        <div className="cartContentContainer">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cartContent">
                                    <div>
                                        <input type="checkbox"/>
                                    </div>
                                    <div>
                                        <img src={item.img} alt="장바구니목록이미지"/>
                                    </div>
                                    <div>{item.name}</div>
                                    <div>
                                        <CartQuantityCounter initialQuantity={item.quantity} index={index}/>
                                    </div>
                                    <div>
                                        <button onClick={() => removeItemFromCart(index)}>X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    총 가격: {totalPrice.toLocaleString()} 원
                </div>
            </div>
        </div>
    );
}

export default Cart;
