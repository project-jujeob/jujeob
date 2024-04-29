import React, { useState, useEffect } from 'react';
import Header from "../../common/Header";
import './CartPage.css';
import CartQuantityCounter from "./CartQuantityCounter";
import {useAuth} from "../../user/Context";
import axios from "axios";
import {Link} from "react-router-dom";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedAll, setSelectedAll] = useState(true); // 전체선택

    const {payload} = useAuth();
    const userNo = payload ? payload.userNo : null;

    //const currentItem = null;

    useEffect(() => {
        if (userNo) {
            // 회원 번호를 기반으로 서버에서 장바구니 정보를 가져옴
            axios.get(`/api/cartPageList/${userNo}`)
                .then(response => {
                    // 장바구니 정보를 상태로 설정하여 화면에 표시
                    const cartItemsFromServer = response.data.map(item => ({ ...item, isChecked: selectedAll }));
                    setCartItems(cartItemsFromServer);
                })
                .catch(error => {
                    console.error('장바구니 정보를 가져오는데 실패했습니다:', error);
                });
        }
    }, [userNo]); // userNo 상태가 변경될 때만 실행됨

    useEffect(() => {
        // 페이지가 로드될 때 현재 로그인된 사용자의 userNo 값을 얻어옴
        if (userNo) {
            // 현재 사용자의 userNo 값을 기준으로 로컬 스토리지에서 장바구니 정보를 가져옴
            const cartItemsForCurrentUser = getCartItems(userNo);

            // 가져온 장바구니 정보를 상태로 설정하여 화면에 표시
            setCartItems(cartItemsForCurrentUser);

            // 전체 선택 상태에 따라 각 항목의 체크 상태를 업데이트하고 총 가격을 계산
            const updatedCart = cartItemsForCurrentUser.map(item => {
                return { ...item, isChecked: selectedAll };
            });
            setCartItems(updatedCart);
            updateTotalPrice(updatedCart); // 전체 선택 상태 변경에 따른 총 가격 업데이트
        }
    }, [userNo, selectedAll]); // userNo와 selectedAll 상태가 변경될 때만 실행됨

    // 로컬 스토리지에서 특정 사용자의 장바구니 정보를 불러오는 함수
    const getCartItems = (userNo) => {
        const cartItems = localStorage.getItem(userNo);
        return cartItems ? JSON.parse(cartItems) : [];
    };

    // 총 가격 업데이트 함수
    const updateTotalPrice = (updatedCart) => {
        const totalPrice = updatedCart.reduce(
            (acc, item) => acc + (item.isChecked ?
                (parseInt(item.price) * item.quantity) : 0), 0);
        setTotalPrice(totalPrice);
    };

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
        localStorage.setItem(userNo, JSON.stringify(updatedCart));

        const productNo = cartItems[index].productNo; // 삭제할 상품의 productNo를 가져옴
        console.log("프로덕트넘버가져오냐",productNo);

        axios.delete(`/api/cartDelete/${userNo}/${productNo}`)
            .then(response => {
                console.log(response.data.message); // 서버로부터의 응답 메시지를 처리
                // 삭제에 성공했을 경우, 화면을 갱신하거나 다른 작업을 수행할 수 있음
            })
            .catch(error => {
                console.error('장바구니 삭제 안됨:', error);
            });

        // 삭제 후 총 가격 업데이트
        //const totalPrice = updatedCart.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
        const totalPrice = updatedCart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
        setTotalPrice(totalPrice);

        const allChecked = updatedCart.every(item => item.isChecked);
        setSelectedAll(allChecked);
    };


    const handleDeleteSelected = () => {
        // 선택된 상품들을 필터링하여 새로운 배열로 생성
        const selectedItems = cartItems.filter(item => item.isChecked);

        // 선택된 상품들의 productNo를 배열로 추출
        const selectedProductNos = selectedItems.map(item => item.productNo);

        // 선택된 상품들의 productNo를 서버로 보내어 삭제 요청
        axios.delete(`/api/cartDeleteSelected/${userNo}`, {
            data: {
                productNos: selectedProductNos
            }
        })
            .then(response => {
                console.log(response.data.message); // 서버로부터의 응답 메시지를 처리
                // 삭제에 성공했을 경우, 화면을 갱신하거나 다른 작업을 수행할 수 있음
            })
            .catch(error => {
                console.error('선택된 상품 삭제 실패:', error);
            });

        // 선택된 상품들을 장바구니에서 제거
        const updatedCart = cartItems.filter(item => !item.isChecked);
        setCartItems(updatedCart);
        localStorage.setItem(userNo, JSON.stringify(updatedCart));

        // 선택된 상품들을 제거한 후 총 가격 업데이트
        const totalPrice = updatedCart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
        setTotalPrice(totalPrice);
        setSelectedAll(false); // 선택된 모든 항목을 삭제한 후 전체 선택 상태를 해제합니다.
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        localStorage.setItem(userNo, JSON.stringify(updatedCart));

        // 서버로 변경된 수량을 전송하여 DB를 업데이트합니다.
        const productNo = updatedCart[index].productNo; // 상품 번호를 가져옵니다.
        axios.put(`/api/updateCartItemQuantity/${userNo}/${productNo}`, { quantity: newQuantity })
            .then(response => {
                console.log(response.data.message); // 서버 응답 메시지를 처리합니다.
            })
            .catch(error => {
                console.error('수량 업데이트 실패:', error);
            });

        updateTotalPrice(updatedCart);
    };

    const paymentAmount = totalPrice + 5000;

    // 선택된 아이템들만 가져오는 함수
    const getSelectedItems = () => {
        return cartItems.filter(item => item.isChecked);
    };

    const selectedItems = getSelectedItems();
    const currentItem = selectedItems.length > 0 ? selectedItems[0] : null;
    console.log("바깥아이템",currentItem);

    /* const link = {
         pathname: '/CustomerOrder',
         state: {selectedItems: selectedItems}
     };*/
    console.log("선택된아이템",selectedItems);
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
                                    cartItems.map((item, index) => {
                                        console.log("Item: ", item) // 아이템 값 콘솔에 출력
                                        console.log("selectedItems:", selectedItems);
                                        return(
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
                                        )
                                    })
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
                        <Link to={"/CustomerOrder"} state={{selectedItems: selectedItems}} className="link">
                            <div className="orderBtn">구매하기</div>
                        </Link>
                        {/*<Link to={{ pathname: "/CustomerOrder", state: selectedItems }}>구매하기</Link>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;