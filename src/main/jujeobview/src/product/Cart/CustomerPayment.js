import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerPayment() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        let script = document.querySelector(
            `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
        );

    },[])

    const handlePayment = () => {
        const { IMP } = window; // 아임포트 라이브러리 초기화
        IMP.init("imp81433431");

        const pay = {
            pg: "html5_inicis.INIpayTest", // 예: html5_inicis
            pay_method: "phone",
            merchant_uid: `merchant_${new Date().getTime()}`,
            name: "주문명:결제테스트",
            amount: 1004,
            buyer_email: "test@portone.io",
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            m_redirect_url: "https://www.your-website.com/payments/complete"
        }
        IMP.request_pay(pay, rsp => { // callback
            if (rsp.success) {
                console.log("결제 성공 했다")
            } else {
                console.log("결제 실패 했다")
            }
        });

    };

    return (
        <div>
            <h1>결제 페이지</h1>
            {
                <button onClick={handlePayment}>결제하기</button>
            }
        </div>
    );
}

export default CustomerPayment;
