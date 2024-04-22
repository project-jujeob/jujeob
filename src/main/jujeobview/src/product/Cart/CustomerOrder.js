import Header from "../../common/Header";
import {useLocation} from "react-router-dom";

function CustomerOrder() {
    const location = useLocation();
    const { selectedItems} = location.state;
    console.log("얍"+JSON.stringify(location) );
    const location2 = JSON.stringify(location);
    console.log("얍2"+location2);

    return (
        <>
            <Header />
            {selectedItems  ? (
                <ul>
                    {selectedItems .map(item => (
                        <li key={item.id}>{item.name} - 수량: {item.quantity}</li>
                    ))}
                </ul>
            ) : (
                <p>선택된 항목이 없습니다.</p>
            )}
            <h2>주문서</h2>
            <div>
                주문 상품 - 제목:
            </div>
            <div>
                주문 상품 - 내역
            </div>
            <div>
                주문자 정보 - 멤버정보로 띄우거나 새로 받기
            </div>
            <div>
                결제수단 - 무통장
            </div>
        </>
    );
}

export default CustomerOrder;