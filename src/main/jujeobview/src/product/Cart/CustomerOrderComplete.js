import Header from "../../common/Header";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../user/Context";

function CustomerOrderComplete() {
    const {payload} = useAuth();
    const location = useLocation();
    //const orderCompleteInfo = location.state.orderCompleteResponse;
    const {orderCompleteResponse, totalPrice} = location.state;
    console.log("orderCompleteInfo:",orderCompleteResponse);
    console.log("totalPrice:",totalPrice);
    const navigate = useNavigate();

    const goToMain = () => {
        navigate("/");
    };

    const goToOrderCompleteDetail = ()=>{
        navigate("/MyPage");
    };

    return (
        <>
            <Header/>
            <div className="orderCompleteContainer">
                <div className="orderCompleteContent">
                    <div className="orderCompleteTop">
                        {/*<span>{payload.memberName}</span>님*/}
                        <span>{payload.name}</span>님
                        <p>주문이 완료되었습니다.</p>
                        <p>빠르게 배송해드릴게요!</p>
                    </div>
                    <div className="orderCompleteView">
                        <div>
                            <p>결제금액</p>
                            <span>{totalPrice.toLocaleString()}</span> 원
                        </div>
                        <div className="orderCompleteBtn">
                            <div className="orderCompleteHome"
                                 onClick={goToMain}>
                                홈으로 이동
                            </div>
                            <div className="orderCompleteDetail"
                                 onClick={goToOrderCompleteDetail}>
                                주문내역 상세보기
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerOrderComplete;