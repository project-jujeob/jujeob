import {useAuth} from "../member/Context";
import {useEffect, useState} from "react";
import axios from "axios";


function OrderDelivery() {

    const {payload} = useAuth();
    console.log("오더딜리버리페이로드:",payload);
    const [orderDeliveries, setOrderDeliveries] = useState([]);

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
        <div className="OrderDeliveryContainer">
            <div>
                <ul>
                    {orderDeliveries.map((order) => (
                        <li key={order.orderId}>
                            주문 번호: {order.orderId}<br/>
                            주문 상품:
                            <ul>
                                {order.orderItems.map((item, index) => (
                                    <li key={index}>
                                        상품 번호: {item.productNo}, 수량: {item.quantity}, 가격: {item.price}
                                    </li>
                                ))}
                            </ul>
                            배송 주소: {order.address}<br/>
                            주문자: {order.memberName}<br/>
                            주문 상태: {order.orderStatus}<br/>
                            결제 방법: {order.paymentMethod}<br/>
                            총 가격: {order.totalPrice}<br/>
                            배송 요청 사항: {order.deliveryRequest}<br/>
                            주문일시: {order.createdAt}<br/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default OrderDelivery;