import React from 'react';


const OrderListByAdmin = () => {


    return (
        <>
            <div className="OrderListByAdmin">
                <div className="OrderListByAdminHeader">
                    <div>전체 주문 건수 : 100개</div>
                    <div>도메인 ( 주문번호, 주문자) 검색</div>
                </div>
                <div className="OrderListByAdminContent">
                    <table>
                        <thead>
                        <tr>
                            <th>주문번호</th>
                            <th>주문자 / 회원 ID</th>
                            <th>주문자 전화번호</th>
                            <th>주문자 배송지</th>
                            <th>주문상품 수</th>
                            <th>주문합계</th>
                            <th>주문상태</th>
                            <th>결제수단</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>총 건수</th>
                            <th>5건</th>
                            <th>주문 총 합계</th>
                            <th>50000원</th>
                            <th>이체 합계</th>
                            <th>25000원</th>
                            <th>카드 합계</th>
                            <th>25000원</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default OrderListByAdmin;