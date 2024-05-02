import Header from "../../common/Header";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../user/Context";
import axios from "axios";

function CustomerOrder() {
    const {payload} = useAuth();
    console.log("오더페이로드",payload);
    const location = useLocation();
    console.log(" 로케이션",location);
    const { selectedItems} = location.state;
    console.log("selectedItems:",selectedItems);
    const navigate = useNavigate();

    const [newAddress, setNewAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('BANK');
    const [deliveryRequest, setDeliveryRequest] = useState('요청사항 없음');
    const [customDeliveryRequest, setCustomDeliveryRequest] = useState('');
    const [orderItems, setOrderItems] = useState([]);


    // 선택된 상품들의 총 가격 계산
    useEffect(() => {
        if (selectedItems.length > 0) {
            const items = selectedItems.map(item => ({
                productNo: item.productNo,
                quantity: item.quantity,
                price: item.price
            }));
            setOrderItems(items);  // 상품 목록 설정
            const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalPrice(total + 5000);  // 가정: 배송비 5000원 추가
        }
    }, [selectedItems]);

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDeliveryRequestChange = (event) => {
        const value = event.target.value;
        setDeliveryRequest(value);
        if (value !== "기타") {
            setCustomDeliveryRequest('');
        }
    };

    const handleCustomDeliveryRequestChange = (event) => {
        setCustomDeliveryRequest(event.target.value);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        try{
            const addressToUse = newAddress || payload.address;
            const response = await axios.post('/api/customerOrder', {
                orderItems,
                address: addressToUse,
                userNo: payload.userNo,
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                orderStatus: "Y",
                paymentMethod,
                totalPrice,
                deliveryRequest: deliveryRequest === "기타" ? customDeliveryRequest : deliveryRequest,
            });

            // 선택된 항목들의 productNo를 추출하여 배열로 생성
            const selectedProductNos = selectedItems.map(item => item.productNo);

            // 로컬 스토리지에서 현재 사용자의 장바구니 정보를 가져옴
            const currentCartItems = JSON.parse(localStorage.getItem(payload.userNo));

            // 선택된 항목들을 제외한 새로운 장바구니 정보 생성
            const updatedCartItems = currentCartItems.filter(item => !selectedProductNos.includes(item.productNo));

            // 새로운 장바구니 정보를 로컬 스토리지에 저장
            localStorage.setItem(payload.userNo, JSON.stringify(updatedCartItems));

            if (response.status === 200 || response.status === 201) {
                handlePayment("html5_inicis.INIpayTest", paymentMethod); // 성공적으로 주문 정보가 저장된 후 결제 처리 실행
            } else {
                console.error('Order submission failed');
                alert('주문 제출에 실패했습니다.');
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다: ' + error.message);
        }
    };

    const handlePayment = (pgValue, payMethod) => {
        const { IMP } = window;
        IMP.init('imp81433431'); // 가맹점 식별코드

        IMP.request_pay({
            pg: pgValue, // 테스트 시 html5_inicis.INIpayTest 기재
            pay_method: payMethod,
            merchant_uid: `merchant_${new Date().getTime()}`, // 상점에서 생성한 고유 주문번호
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_email: payload.email, // 구매자 이메일
            buyer_name: payload.name, // 구매자 이름
            buyer_tel: payload.phone, // 구매자 전화번호
            buyer_addr: newAddress || payload.address, // 구매자 주소
}, function (response) {
    if (response.success) {
        alert('결제가 완료되었습니다.');
        navigate("/CustomerOrderComplete", { state: { orderCompleteResponse: orderItems, totalPrice: totalPrice } });
    } else {
        alert(`결제에 실패하였습니다. 에러내용: ${response.error_msg}`);
    }
});
};
console.log("페이먼트",paymentMethod);


return (
    <>
        <Header />
        <div className="orderContainer">
            {selectedItems && selectedItems.length > 0 ? (
                <form onSubmit={handleOrderSubmit}>
                    <div className="orderContainerInner">
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
                                {payload ? (
                                    <>
                                        <div><span>받는 사람</span><p>{payload.name}</p></div>
                                        <div><span>휴대폰</span><p>{payload.phone}</p></div>
                                        <div><span>이메일</span><p>{payload.email}</p></div>
                                    </>
                                ) : (
                                    <p>주문자 정보를 불러오는 중 오류가 발생했습니다.</p>
                                )}
                            </div>
                            <div className="orderInfo">
                                <h2>배송 정보</h2>
                            </div>
                            <div className="orderInfoDetail">
                                <div>
                                    <span>배송지</span>
                                    {payload && payload.address ? payload.address : '주소가 없습니다.'}
                                </div>
                                <div className="changeAddr">
                                    <span>배송지 변경</span>
                                    <input type="text" value={newAddress} onChange={handleAddressChange}
                                           placeholder="배송지 변경시 입력해주세요"/>
                                </div>

                                <div>
                                    <span>요청사항</span>
                                    <select value={deliveryRequest} onChange={handleDeliveryRequestChange}>
                                        <option value="요청사항 없음">요청사항 없음</option>
                                        <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                                        <option value="배송 전 연락주세요">배송 전 연락주세요</option>
                                        <option value="문앞에 놓고 가주세요">문앞에 놓고 가주세요</option>
                                        <option value="기타">기타</option>
                                    </select>
                                    {deliveryRequest === "기타" && (
                                        <input type="text" value={customDeliveryRequest}
                                               onChange={handleCustomDeliveryRequestChange}/>
                                    )}
                                </div>
                                <div>
                                    <span>총 주문 금액:</span> {totalPrice.toLocaleString()}원 (배송비 포함)
                                </div>

                                <div>
                                    <span>결제 방법</span>
                                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                                        <option value="card">카드 결제</option>
                                        <option value="trans">실시간 계좌이체</option>
                                        <option value="vbank">가상 계좌</option>
                                        <option value="kakaopay">카카오 결제</option>
                                        <option value="phone">모바일 결제</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="orderSubmitBtn">
                        <button type="submit">주문하기</button>
                    </div>
                </form>
            ) : (
                <p>선택된 항목이 없습니다.</p>
            )}
        </div>
    </>
);
}

export default CustomerOrder;

//////////////////////////////////////////////////////////////////////////////////////////////

/*import Header from "../../common/Header";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../user/Context";
import axios from "axios";

function CustomerOrder() {
    const {payload} = useAuth();
    console.log("오더페이로드",payload);
    const location = useLocation();
    console.log(" 로케이션",location);
    const { selectedItems} = location.state;
    console.log("selectedItems:",selectedItems);

    const [newAddress, setNewAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('BANK');
    const [deliveryRequest, setDeliveryRequest] = useState('요청사항 없음');
    const [customDeliveryRequest, setCustomDeliveryRequest] = useState('');
    const navigate = useNavigate();

    // 선택된 상품들의 총 가격 계산
    useEffect(() => {
        if (selectedItems && selectedItems.length > 0) {
            // 각 상품의 총 가격 계산
            const total = selectedItems.reduce((acc, item) => {
                // 상품의 가격과 수량을 곱하여 합산
                return acc + (item.price * item.quantity);
            }, 0);

            // 총 가격 설정
            setTotalPrice(total+5000);
        }
    }, [selectedItems]);

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDeliveryRequestChange = (event) => {
        const value = event.target.value;
        setDeliveryRequest(value);
        if (value !== "기타") {
            setCustomDeliveryRequest('');
        }
    };

    const handleCustomDeliveryRequestChange = (event) => {
        setCustomDeliveryRequest(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addressToUse = newAddress ? newAddress : payload.address;
            console.log("오더주소:",addressToUse);

            const orderItems = selectedItems.map((item) => ({
                productNo: item.productNo,
                quantity: item.quantity,
                price: item.price
            }));
            console.log("오더아이템즈:",orderItems);

            const response = await axios.post(`/api/customerOrder`, {
                orderItems: orderItems,
                address: addressToUse,
                userNo: payload.userNo,
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                orderStatus: "Y",
                paymentMethod: paymentMethod,
                totalPrice:totalPrice,
                deliveryRequest: deliveryRequest === "기타" ? customDeliveryRequest : deliveryRequest
            });

            // 선택된 항목들의 productNo를 추출하여 배열로 생성
            const selectedProductNos = selectedItems.map(item => item.productNo);

            // 로컬 스토리지에서 현재 사용자의 장바구니 정보를 가져옴
            const currentCartItems = JSON.parse(localStorage.getItem(payload.userNo));

            // 선택된 항목들을 제외한 새로운 장바구니 정보 생성
            const updatedCartItems = currentCartItems.filter(item => !selectedProductNos.includes(item.productNo));

            // 새로운 장바구니 정보를 로컬 스토리지에 저장
            localStorage.setItem(payload.userNo, JSON.stringify(updatedCartItems));

            console.log("response:",response);
            if (response.status === 200 || response.status === 201) {
                alert("상품 주문 완료");
                navigate("/CustomerOrderComplete",{state:{orderCompleteResponse:orderItems,totalPrice:totalPrice}});
                console.log("orderCompleteInfo:",response.data);
            } else {
                console.error('상품 주문 실패');
            }
        } catch (error) {
            // 서버 오류 메시지 확인
            if (error.response && error.response.data) {
                alert(`주문 실패: ${error.response.data}`);
            } else {
                alert('요청 보내기 실패');
            }
        }

    };
    console.log("페이먼트",paymentMethod);

    return (
        <>
            <Header />
            <div className="orderContainer">
                {selectedItems && selectedItems.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <div className="orderContainerInner">
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
                                    {payload ? (
                                        <>
                                            <div><span>받는 사람</span><p>{payload.name}</p></div>
                                            <div><span>휴대폰</span><p>{payload.phone}</p></div>
                                            <div><span>이메일</span><p>{payload.email}</p></div>
                                        </>
                                    ) : (
                                        <p>주문자 정보를 불러오는 중 오류가 발생했습니다.</p>
                                    )}
                                </div>
                                <div className="orderInfo">
                                    <h2>배송 정보</h2>
                                </div>
                                <div className="orderInfoDetail">
                                    <div>
                                        <span>배송지</span>
                                        {payload && payload.address ? payload.address : '주소가 없습니다.'}
                                    </div>
                                    <div className="changeAddr">
                                        <span>배송지 변경</span>
                                        <input type="text" value={newAddress} onChange={handleAddressChange}
                                               placeholder="배송지 변경시 입력해주세요"/>
                                    </div>

                                    <div>
                                        <span>요청사항</span>
                                        <select value={deliveryRequest} onChange={handleDeliveryRequestChange}>
                                            <option value="요청사항 없음">요청사항 없음</option>
                                            <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                                            <option value="배송 전 연락주세요">배송 전 연락주세요</option>
                                            <option value="문앞에 놓고 가주세요">문앞에 놓고 가주세요</option>
                                            <option value="기타">기타</option>
                                        </select>
                                        {deliveryRequest === "기타" && (
                                            <input type="text" value={customDeliveryRequest}
                                                   onChange={handleCustomDeliveryRequestChange}/>
                                        )}
                                    </div>
                                    <div>
                                        <span>총 주문 금액:</span> {totalPrice.toLocaleString()}원 (배송비 포함)
                                    </div>
                                    {/!* 결제 방법 선택 *!/}
                                    <div>
                                        <span>결제 방법</span>
                                        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                                            <option value="BANK">은행 송금</option>
                                            <option value="CARD">카드 결제</option>
                                            <option value="MOBILE">모바일 결제</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orderSubmitBtn">
                            <button type="submit">주문하기</button>
                        </div>
                    </form>
                ) : (
                    <p>선택된 항목이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default CustomerOrder;*/

//////////////////////////////////////////////////////////////////////////////////////////////

/*
import Header from "../../common/Header";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../user/Context";
import axios from "axios";

function CustomerOrder() {
    const {payload} = useAuth();
    console.log("오더페이로드",payload);
    const location = useLocation();
    console.log(" 로케이션",location);
    const { selectedItems} = location.state;
    console.log("selectedItems:",selectedItems);
    const navigate = useNavigate();

    const [newAddress, setNewAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('BANK');
    const [deliveryRequest, setDeliveryRequest] = useState('요청사항 없음');
    const [customDeliveryRequest, setCustomDeliveryRequest] = useState('');
    const [orderItems, setOrderItems] = useState([]);


    // 선택된 상품들의 총 가격 계산
    useEffect(() => {
        if (selectedItems.length > 0) {
            const items = selectedItems.map(item => ({
                productNo: item.productNo,
                quantity: item.quantity,
                price: item.price
            }));
            setOrderItems(items);  // 상품 목록 설정
            const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalPrice(total + 5000);  // 가정: 배송비 5000원 추가
        }
    }, [selectedItems]);

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDeliveryRequestChange = (event) => {
        const value = event.target.value;
        setDeliveryRequest(value);
        if (value !== "기타") {
            setCustomDeliveryRequest('');
        }
    };

    const handleCustomDeliveryRequestChange = (event) => {
        setCustomDeliveryRequest(event.target.value);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        try{
            const addressToUse = newAddress || payload.address;
            const response = await axios.post('/api/customerOrder', {
                orderItems,
                address: addressToUse,
                userNo: payload.userNo,
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                orderStatus: "Y",
                paymentMethod,
                totalPrice,
                deliveryRequest: deliveryRequest === "기타" ? customDeliveryRequest : deliveryRequest,
            });

            // 선택된 항목들의 productNo를 추출하여 배열로 생성
            const selectedProductNos = selectedItems.map(item => item.productNo);

            // 로컬 스토리지에서 현재 사용자의 장바구니 정보를 가져옴
            const currentCartItems = JSON.parse(localStorage.getItem(payload.userNo));

            // 선택된 항목들을 제외한 새로운 장바구니 정보 생성
            const updatedCartItems = currentCartItems.filter(item => !selectedProductNos.includes(item.productNo));

            // 새로운 장바구니 정보를 로컬 스토리지에 저장
            localStorage.setItem(payload.userNo, JSON.stringify(updatedCartItems));

            if (response.status === 200 || response.status === 201) {
                handlePayment("kcp.AO09C", paymentMethod); // 성공적으로 주문 정보가 저장된 후 결제 처리 실행
            } else {
                console.error('Order submission failed');
                alert('주문 제출에 실패했습니다.');
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다: ' + error.message);
        }
    };

    const handlePayment = (pgValue, payMethod) => {
        const { IMP } = window;
        IMP.init('imp81433431'); // 가맹점 식별코드

        IMP.request_pay({
            pg: pgValue, // 테스트 시 html5_inicis.INIpayTest 기재
            pay_method: payMethod,
            merchant_uid: `merchant_${new Date().getTime()}`, // 상점에서 생성한 고유 주문번호
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_email: payload.email, // 구매자 이메일
            buyer_name: payload.name, // 구매자 이름
            buyer_tel: payload.phone, // 구매자 전화번호
            buyer_addr: newAddress || payload.address, // 구매자 주소
            buyer_postcode: "123-456", // 구매자 우편번호
            /!*m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
            escrow: true, // 에스크로 결제 설정
            vbank_due: "YYYYMMDD", // 가상계좌 입금 기한
            bypass: {
                acceptmethod: "noeasypay, cardpoint", // 간편결제와 카드포인트 동시 설정
                P_RESERVED: "noeasypay=Y, cp_yn=Y" // 모바일에서의 설정
            },
            period: {
                from: "20200101", // 시작 날짜
                to: "20201231" // 종료 날짜
            }*!/
        }, function (response) {
            if (response.success) {
                alert('결제가 완료되었습니다.');
                navigate("/CustomerOrderComplete", { state: { orderCompleteResponse: orderItems, totalPrice: totalPrice } });
            } else {
                alert(`결제에 실패하였습니다. 에러내용: ${response.error_msg}`);
            }
        });
    };
    console.log("페이먼트",paymentMethod);


    return (
        <>
            <Header />
            <div className="orderContainer">
                {selectedItems && selectedItems.length > 0 ? (
                    <form onSubmit={handleOrderSubmit}>
                        <div className="orderContainerInner">
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
                                    {payload ? (
                                        <>
                                            <div><span>받는 사람</span><p>{payload.name}</p></div>
                                            <div><span>휴대폰</span><p>{payload.phone}</p></div>
                                            <div><span>이메일</span><p>{payload.email}</p></div>
                                        </>
                                    ) : (
                                        <p>주문자 정보를 불러오는 중 오류가 발생했습니다.</p>
                                    )}
                                </div>
                                <div className="orderInfo">
                                    <h2>배송 정보</h2>
                                </div>
                                <div className="orderInfoDetail">
                                    <div>
                                        <span>배송지</span>
                                        {payload && payload.address ? payload.address : '주소가 없습니다.'}
                                    </div>
                                    <div className="changeAddr">
                                        <span>배송지 변경</span>
                                        <input type="text" value={newAddress} onChange={handleAddressChange}
                                               placeholder="배송지 변경시 입력해주세요"/>
                                    </div>

                                    <div>
                                        <span>요청사항</span>
                                        <select value={deliveryRequest} onChange={handleDeliveryRequestChange}>
                                            <option value="요청사항 없음">요청사항 없음</option>
                                            <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                                            <option value="배송 전 연락주세요">배송 전 연락주세요</option>
                                            <option value="문앞에 놓고 가주세요">문앞에 놓고 가주세요</option>
                                            <option value="기타">기타</option>
                                        </select>
                                        {deliveryRequest === "기타" && (
                                            <input type="text" value={customDeliveryRequest}
                                                   onChange={handleCustomDeliveryRequestChange}/>
                                        )}
                                    </div>
                                    <div>
                                        <span>총 주문 금액:</span> {totalPrice.toLocaleString()}원 (배송비 포함)
                                    </div>
                                    {/!* 결제 방법 선택 *!/}
                                    <div>
                                        <span>결제 방법</span>
                                        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                                            <option value="trans">계좌 이체</option>
                                            <option value="card">카드 결제</option>
                                            <option value="phone">모바일 결제</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orderSubmitBtn">
                            <button type="submit">주문하기</button>
                        </div>
                    </form>
                ) : (
                    <p>선택된 항목이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default CustomerOrder;
*/
