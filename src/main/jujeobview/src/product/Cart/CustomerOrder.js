import Header from "../../common/Header";
import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../../member/Context";
import axios from "axios";

function CustomerOrder() {
    const {payload} = useAuth();
    console.log("오더페이로드",payload);
    const location = useLocation();
    console.log(" 로케이션",location);
    const { selectedItems} = location.state;
    console.log("selectedItems:",selectedItems);

    const [newAddress, setNewAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('BANK');

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addressToUse = newAddress ? newAddress : payload.memberAddr;
            console.log("오더주소:",addressToUse);

            const orderItems = selectedItems.map((item) => ({
                productNo: item.productNo,
                quantity: item.quantity,
                price: item.price,
            }));
            console.log("오더아이템즈:",orderItems);

            const response = await axios.post(`/api/customerOrder`, {
                orderItems: orderItems,
                address: addressToUse,
                memNo: payload.memberNo,
                memberName: payload.memberName,
                memberPhone: payload.memberPhone,
                memberEmail: payload.memberEmail,
                orderStatus: "Y",
                paymentMethod: paymentMethod
            });

            //

            // 선택된 항목들의 productNo를 추출하여 배열로 생성
            const selectedProductNos = selectedItems.map(item => item.productNo);

            // 로컬 스토리지에서 현재 사용자의 장바구니 정보를 가져옴
            const currentCartItems = JSON.parse(localStorage.getItem(payload.memberNo));

            // 선택된 항목들을 제외한 새로운 장바구니 정보 생성
            const updatedCartItems = currentCartItems.filter(item => !selectedProductNos.includes(item.productNo));

            // 새로운 장바구니 정보를 로컬 스토리지에 저장
            localStorage.setItem(payload.memberNo, JSON.stringify(updatedCartItems));

            //

            console.log("response:",response);
            if (response.status === 200 || response.status === 201) {
                alert("상품 주문 완료");
            } else {
                console.error('상품 주문 실패');
            }
        } catch (error) {
            console.error('요청 보내기 실패:', error);
        }

    };
    console.log("페이먼트",paymentMethod);

    return (
        <>
            <Header />
            <div className="orderContainer">
                {selectedItems && selectedItems.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="orderTitle">
                                <h1>주문서</h1>
                            </div>
                            <div>
                                <div className="orderItem">
                                    <h2>주문 상품</h2>
                                </div>
                                {selectedItems.map((item, index) => {
                                    console.log("아이템", item);
                                    return (
                                        <div key={item.productNo} className="cartContent">
                                            <div>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <img src={item.img} alt="주문내역목록이미지"/>
                                            </div>
                                            <div>
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.quantity} 개
                                            </div>
                                            <div>
                                                {(item.price * item.quantity).toLocaleString()}원
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="orderInfo">
                                    <h2>주문자 정보</h2>
                                </div>
                                <div className="orderInfoDetail">
                                    <div><span>받는 사람</span><p>{payload.memberName}</p></div>
                                    <div><span>휴대폰</span><p>{payload.memberPhone}</p></div>
                                    <div><span>이메일</span><p>{payload.memberEmail}</p></div>
                                </div>
                                <div className="orderInfo">
                                    <h2>배송 정보</h2>
                                </div>
                                <div className="orderInfoDetail">
                                    <div><span>배송지</span>
                                        <div>
                                            {payload.memberAddr}
                                            <input type="text" value={newAddress} onChange={handleAddressChange}/>
                                            <button onClick={handleSubmit}>주소 저장</button>
                                        </div>
                                    </div>
                                    <div><span>요청사항</span>
                                        <input/>
                                    </div>
                                    {/* 결제 방법 선택 */}
                                    <div>
                                        <span>결제 방법</span>
                                        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                                            <option value="CARD">카드 결제</option>
                                            <option value="MOBILE">모바일 결제</option>
                                            <option value="BANK" selected>은행 송금</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit">주문하기</button>
                    </form>
                ) : (
                    <p>선택된 항목이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default CustomerOrder;