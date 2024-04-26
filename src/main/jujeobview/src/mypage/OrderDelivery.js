import {useAuth} from "../member/Context";
import {useEffect, useState} from "react";
import axios from "axios";


function OrderDelivery() {

    const {payload} = useAuth();
    console.log("오더딜리버리페이로드:",payload);
    const [orderDeliveries, setOrderDeliveries] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // 클릭한 주문 번호를 기억하고 펼쳐지도록 설정
    const toggleOrderDetails = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null); // 이미 펼쳐져 있으면 닫기
        } else {
            setExpandedOrderId(orderId); // 펼치기
        }
    };

    const cancelOrder = (orderId) =>{
        //주문 취소 요청
        axios.put(`/api/cancelOrder/${orderId}`)
            .then(response => {
                console.log("주문 취소 결과:",response.data);
                console.log("orderId:",orderId);

                //주문 취소가 성공하면 해당 주문을 업데이트
                const updatedOrders = orderDeliveries.map(order => {
                    if(order.orderId === orderId){
                        return{ ...order, orderStatus:"N"};
                    }
                    return order;
                });
                setOrderDeliveries(updatedOrders);
                alert("주문이 취소되었습니다");
            })
            .catch(error=>{
                console.error("주문 취소 실패:",error);
            });
    };

    useEffect(() => {
        if(payload){
            axios.get(`/api/orderDeliveries/${payload.memberNo}`)
                .then((response)=>{
                    console.log("주문내역 가져온 값:",response.data);
                    setOrderDeliveries(response.data);
                })
                .catch((error)=>{
                    console.log('주문내역 가져오기 실패:',error);
                })
        }
    }, [payload]);

    return(
        <div className="orderDeliveryContainer">
            <div>
                {orderDeliveries.map((order) => (
                    <div key={order.orderId}>
                        {/* 주문 번호를 클릭할 때 toggleOrderDetails 함수 호출 */}
                        <div onClick={() => toggleOrderDetails(order.orderId)}
                             className="orderDeliveryTitle">
                            주문 번호: {order.orderId}
                        </div>
                        {/* 펼쳐진 주문의 세부 정보만 표시 */}
                        {expandedOrderId === order.orderId && (
                            <div>
                                <div onClick={() => cancelOrder(order.orderId)}
                                     className="orderCancelBtn">주문취소</div>
                                [주문 상품]
                                {order.orderItems.map((item, index) => {
                                    console.log("아이템:",item); // 주문 상품에 대한 로그 출력
                                    return (
                                        <div key={index}>
                                            <img src={item.img} alt="주문내역상품이미지"/>
                                            상품 번호: {item.productNo}, 수량: {item.quantity}, 가격: {item.price}
                                        </div>
                                    );
                                })}
                                <div>
                                    배송 주소: {order.address}
                                </div>
                                <div>
                                    주문자: {order.memberName}
                                </div>
                                <div>
                                    주문 상태: {order.orderStatus === 'Y' ? '주문 완료' : '주문 취소'}
                                </div>
                                <div>
                                    결제 방법: {order.paymentMethod}
                                </div>
                                <div>
                                    총 가격: {order.totalPrice}
                                </div>
                                <div>
                                    배송 요청 사항: {order.deliveryRequest}
                                </div>
                                <div>
                                    주문일시: {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                                    ({new Date(order.createdAt).toLocaleTimeString('ko-KR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })})
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderDelivery;