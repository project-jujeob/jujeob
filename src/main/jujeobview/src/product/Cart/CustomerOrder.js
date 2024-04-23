import Header from "../../common/Header";
import {useLocation} from "react-router-dom";
import React from "react";
import {useAuth} from "../../member/Context";

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


    return (
        <>
            <Header />
            <div className="orderContainer">
                {selectedItems && selectedItems.length > 0 ? (
                    <div>
                        <div className="orderTitle">
                            <h1>주문서</h1>
                        </div>
                        <div>
                            <div className="orderItem">
                                <h3>주문 상품</h3>
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
                                            수량: {item.quantity}
                                        </div>
                                        <div>
                                            가격: {(item.price * item.quantity).toLocaleString()}원
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="orderUser">
                                <h3>주문자 정보</h3>
                            </div>
                            <div>
                                <div><span>받는 사람</span>{payload.memberName}</div>
                                <div><span>휴대폰</span>{payload.memberPhone}</div>
                                <div><span>이메일</span></div>
                            </div>
                            <div className="orderUser">
                                <h3>배송 정보</h3>
                            </div>
                            <div>
                                <div><span>배송지</span></div>
                                <div><span>요청사항</span></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>선택된 항목이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default CustomerOrder;