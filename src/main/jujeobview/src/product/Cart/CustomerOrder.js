import Header from "../../common/Header";
import {useLocation} from "react-router-dom";

function CustomerOrder() {
    const location = useLocation();
    console.log(" 로케이션",location);
    /*const { selectedItems} = location.state;

    console.log("주문자 정보:", selectedItems);

    console.log("selectedItems:",selectedItems);
    console.log("location:"+JSON.stringify(location) );
    const location2 = JSON.stringify(location);
    console.log("location2:"+location2);
*/
    //const selectedItems = location.state?.state?.selectedItems;
    const selectedItem = location.state.state.selectedItems;
    // 이거 무조건 풀어서 받는 수 밖에 없는듯

    return (
        <>
            <Header />
            {selectedItem && selectedItem.length > 0 ? (
                <div>
                    <h2>선택된 상품 목록</h2>
                    <ul>
                        {selectedItem.map(item => (
                            <li key={item.productNo}>
                                상품번호: {item.productNo}, 상품명: {item.name}, 가격: {item.price}, 수량: {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
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