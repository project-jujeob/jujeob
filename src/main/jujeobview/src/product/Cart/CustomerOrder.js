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

    /*console.log("주문자 정보:", selectedItems);

    console.log("selectedItems:",selectedItems);
    console.log("location:"+JSON.stringify(location) );
    const location2 = JSON.stringify(location);
    console.log("location2:"+location2);

    const selectedItem = location.state?.state?.selectedItems;
    console.log("셀렉트아이템",selectedItem);*/
    //const selectedItem = location.state.state.selectedItems;
    // 이거 무조건 풀어서 받는 수 밖에 없는듯

    /*const decodedName = decodeURIComponent(escape(payload.memberName));
    console.log("한글",decodedName);*/

    const [newAddress, setNewAddress] = useState('');

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 새로운 주소가 있는지 확인하고, 없는 경우 기존 주소를 사용
        const addressToUse = newAddress ? newAddress : payload.memberAddr;

        const orderItems = selectedItems.map((item) => ({
            productNo: item.productNo,
            quantity: item.quantity,
            price: item.price,
        }));

        // 서버로 전송할 주문 정보 객체 생성
        const orderData = {
            orderItems: orderItems,
            addressToUse: addressToUse,
            memberInfo: {
                memberName: payload.memberName,
                memberPhone: payload.memberPhone,
                memberEmail: payload.memberEmail
            },
        };

        // 주문 정보를 서버로 전송
        axios.post("/api/placeOrder", orderData)
            .then((response) => {
                console.log(response.data);
                // 성공적으로 주문을 처리한 경우 추가 작업 수행
            })
            .catch((error) => {
                console.error("주문 처리 실패:", error);
            });
    };

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