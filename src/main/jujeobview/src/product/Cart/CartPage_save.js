import React, { useState, useEffect } from 'react';
import Header from "../../common/Header";
import './CartPage.css';
import CartQuantityCounter from "./CartQuantityCounter";

// 로컬 스토리지에서 상품 정보를 불러옴
const getCartItems = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
};

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedAll, setSelectedAll] = useState(true); // 전체선택

    useEffect(() => {
        // 페이지가 로드될 때 로컬 스토리지에서 장바구니 정보를 가져옴
        const items = getCartItems();
        setCartItems(items);

        // 전체 선택 상태에 따라 각 항목의 체크 상태를 업데이트하고 총 가격을 계산
        const updatedCart = items.map(item => {
            return { ...item, isChecked: selectedAll };
        });
        setCartItems(updatedCart);
        updateTotalPrice(updatedCart); // 전체 선택 상태 변경에 따른 총 가격 업데이트
    }, [selectedAll]); // selectedAll 상태가 변경될 때만 실행됨

    // 총 가격 업데이트 함수
    const updateTotalPrice = (updatedCart) => {
        const totalPrice = updatedCart.reduce(
            (acc, item) => acc + (item.isChecked ?
                (parseInt(item.price) * item.quantity) : 0), 0);
        setTotalPrice(totalPrice);
    };

    /* 총 가격 계산 - 되는지 확인 필요
         useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
        calculateTotalPrice(items); // 총 가격 계산 함수 호출
    }, []);

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
        setTotalPrice(totalPrice);
    };
     */


    // 개별 체크박스 상태 변경 핸들러
    const handleCheckboxChange = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].isChecked = !updatedCart[index].isChecked;
        setCartItems(updatedCart);

        updateTotalPrice(updatedCart);

    };

    // 전체 선택 체크박스 상태 변경 핸들러
    const handleToggleAllCheckboxes = () => {
        const newCheckedStatus = !selectedAll;
        setSelectedAll(newCheckedStatus);
        const updatedCart = cartItems.map(item => {
            return { ...item, isChecked: newCheckedStatus };
        });
        setCartItems(updatedCart);
        updateTotalPrice(updatedCart); // 전체 선택 상태 변경에 따른 총 가격 업데이트
    };

    // 장바구니 삭제
    const removeItemFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // 삭제 후 총 가격 업데이트
        //const totalPrice = updatedCart.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
        const totalPrice = updatedCart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
        setTotalPrice(totalPrice);

        const allChecked = updatedCart.every(item => item.isChecked);
        setSelectedAll(allChecked);
    };
    /* 장바구니 삭제 후 총 가격 업데이트 - 되는지 확인 필요
        const removeItemFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotalPrice(updatedCart); // 총 가격 업데이트
    };
     */

    const handleDeleteSelected = () => {
        const updatedCart = cartItems.filter(item => !item.isChecked);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        //const totalPrice = updatedCart.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
        const totalPrice = updatedCart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
        setTotalPrice(totalPrice);
        setSelectedAll(false); // 선택된 모든 항목을 삭제한 후 전체 선택 상태를 해제합니다.
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateTotalPrice(updatedCart);
    };

    const paymentAmount = totalPrice + 5000;

    return (
        <div>
            <Header/>
            <div className="cartContainer">
                <div className="cartTitle">
                    <h1>장바구니</h1>
                </div>
                <div className="cartTotal">
                    <div className="cartContentList">
                        <div className="cartTotalChecked">
                            <div className="cartCheckTotalBox">
                                <label>
                                    <input type="checkbox" checked={selectedAll} className="selectedAllCheckbox"
                                           onChange={handleToggleAllCheckboxes}/>
                                    <span>전체선택({cartItems.filter(item => item.isChecked).length}개
                                    &nbsp;/&nbsp;
                                    {cartItems.length}개)</span>
                                </label>
                                <span>&nbsp; | &nbsp;</span>
                                <p className="checkDeleteBtn" onClick={handleDeleteSelected}>선택삭제</p>
                            </div>
                            <div className="cartContentContainer">
                                {cartItems.length === 0 ? (
                                    <p className="emptyCart">장바구니에 상품이 없습니다.</p>
                                ) : (
                                    cartItems.map((item, index) => (
                                        <div key={index} className="cartContent">
                                            <div className="listCheckbox">
                                                <input type="checkbox"
                                                       checked={item.isChecked}
                                                       onChange={() => handleCheckboxChange(index)}
                                                />
                                            </div>
                                            <div>
                                                <img src={item.img} alt="장바구니목록이미지"/>
                                            </div>
                                            <div>{item.name}</div>
                                            <div>
                                                <CartQuantityCounter initialQuantity={item.quantity}
                                                                     index={index}
                                                                     onQuantityChange={handleQuantityChange}
                                                />
                                            </div>
                                            <div>
                                                {(parseInt(item.price) * item.quantity).toLocaleString()}원
                                            </div>
                                            <div>
                                                <p className="deleteBtn" onClick={() => removeItemFromCart(index)}>X</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="cartContentRight">
                        <div className="cartTotalPrice">
                            <div className="cartPaymentAmount">
                                <span>상품 금액 : </span>
                                <span>{totalPrice.toLocaleString()} 원</span>
                            </div>
                            <div className="cartPaymentAmount">
                                <span>배송비 : </span>
                                <span>5,000원</span>
                            </div>
                            <div className="cartPaymentAmount">
                                <span>결제예정금액 : </span>
                                <span className="paymentBold">{paymentAmount.toLocaleString()} 원</span>
                            </div>
                        </div>
                        <div className="orderBtn">구매하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
