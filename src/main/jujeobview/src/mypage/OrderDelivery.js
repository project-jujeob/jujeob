import {useAuth} from "../user/Context";
import {useEffect, useState} from "react";
import axios from "axios";
import ReviewWrite from "../product/Detail/review/ReviewWrite";


function OrderDelivery() {

    const {payload} = useAuth();
    console.log("오더딜리버리페이로드:",payload);
    const [orderDeliveries, setOrderDeliveries] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const [reviewModalOpen, setReviewModalOpen] = useState(false); // 후기 작성 모달의 열림/닫힘 상태
    const [selectedProductForReview, setSelectedProductForReview] = useState(null); // 후기 작성 모달에 전달할 데이터

    // item값 중 후기 작성을 클릭한 item값만 선택
    const openReviewModal = (item) => {
        setSelectedProductForReview(() => item); // 후기 작성 모달에 전달할 데이터 설정
        setReviewModalOpen(true); // 후기 작성 모달 열기
    };

    // 클릭한 주문 번호를 기억하고 펼쳐지도록 설정
    const toggleOrderDetails = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null); // 이미 펼쳐져 있으면 닫기
        } else {
            setExpandedOrderId(orderId); // 펼치기
        }
    };

    const cancelOrder = (orderId) =>{
        const confirmCancel = window.confirm("주문을 취소하시겠습니까?");

        if(confirmCancel){
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
                    console.error("주문 취소 실패:",error);                });
        }

    };

    useEffect(() => {
        if(payload){
            axios.get(`/api/orderDeliveries/${payload.userNo}`)
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
                             className={`orderDeliveryTitle${expandedOrderId === order.orderId ? ' expanded' : ''}`}>
                            <div className="orderDeliveryTitleIn">
                                <div>
                                    주문 번호: {order.orderId}
                                </div>
                                <div
                                    className={`orderDeliveryCancelNotice${order.orderStatus !== 'Y' ? ' redText' : ''}`}>
                                    {order.orderStatus === 'Y' ? '주문 완료' : '주문 취소'}
                                </div>
                            </div>
                        </div>
                        {/* 펼쳐진 주문의 세부 정보만 표시 */}
                        {expandedOrderId === order.orderId && (
                            <div className="orderDeliveryContent">
                                <div className="orderDeliveryContent2">
                                    <div>
                                        {order.orderItems.map((item, index) => {
                                            console.log("아이템:", item); // 주문 상품에 대한 로그 출력
                                            return (
                                                <div key={index} className="orderDeliveryItems">
                                                    <div className="orderImgContainer">
                                                        <img src={item.img} alt="주문내역상품이미지" className="orderImg"/>
                                                    </div>
                                                    <div className="orderDeliveryItemsDetail">
                                                        <span>{item.productName}</span>
                                                        <div className="orderDeliveryItemDetail2">
                                                            <span>{item.price.toLocaleString()}원</span>&ensp;|&ensp;
                                                            <span>{item.quantity}병</span>
                                                        </div>
                                                        <div className="orderDeliveryReview">
                                                            {order.orderStatus === 'Y' ?
                                                                <span onClick={() => openReviewModal(item)}>후기 작성</span> : null}
                                                        </div>
                                                        {reviewModalOpen && (
                                                            <div className="modal">
                                                                <div className="modalContent">
                                                                    <ReviewWrite
                                                                        item={selectedProductForReview} // 후기 작성 모달에 전달할 데이터 전달
                                                                        closeModal={() => setReviewModalOpen(false)} // 모달 닫기 함수 전달
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="orderDeliveryContent3">
                                        <div>
                                            <span>배송지:</span> {order.address}
                                        </div>
                                        <div>
                                            <span>주문자:</span> {order.name}
                                        </div>
                                        <div>
                                            <span>주문 상태:</span> {order.orderStatus === 'Y' ? '주문 완료' : '주문 취소'}
                                        </div>
                                        <div>
                                            <span>결제 방법:</span> {order.paymentMethod}
                                        </div>
                                        <div>
                                            <span>결제 금액:</span> {order.totalPrice.toLocaleString()}원
                                        </div>
                                        <div>
                                            <span>배송 요청 사항:</span> {order.deliveryRequest}
                                        </div>
                                        <div>
                                            <span>주문일시:</span> {new Date(order.createdAt).toLocaleDateString('ko-KR', {
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
                                    <div>
                                        {order.orderStatus === 'Y' ? <div onClick={() => cancelOrder(order.orderId)}
                                                                          className="orderCancelBtn">주문 취소
                                        </div> : null}
                                    </div>
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