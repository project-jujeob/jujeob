import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import IdentityVerification from "./IdentityVerification";

const AdultVerification = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // jQuery 로드
        const jQueryScript = document.createElement('script');
        jQueryScript.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
        jQueryScript.async = true;
        document.head.appendChild(jQueryScript);

        // iamport 외부 스크립트 로드
        const iamportScript = document.createElement('script');
        iamportScript.src = 'https://cdn.iamport.kr/v1/iamport.js';
        iamportScript.async = true;
        document.head.appendChild(iamportScript);

        // 컴포넌트가 언마운트될 때 스크립트 제거
        return () => {
            document.head.removeChild(jQueryScript);
            document.head.removeChild(iamportScript);
        };
    }, []);

    const requestKg = () => {
        if (window.jQuery && window.IMP) {
            window.IMP.init("imp81433431");
            window.IMP.certification({
                pg: "inicis_unified",
                merchant_uid: "test_lu9uzy8d",
                popup: true,
            }, function(rsp) {
                if (rsp.success) {
                    alert('인증에 성공했습니다.');
                    navigate("/Register");
                } else {
                    alert('인증에 실패했습니다. 에러 메시지: ' + rsp.error_msg);
                }
            });
        } else {
            alert('외부 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        }
    };
    return (
        <div>
            <h1>본인 인증</h1>
            <button onClick={requestKg}>인증하기</button>
        </div>
    );
};

export default IdentityVerification;

// import React, { useEffect } from 'react';
// import axios from 'axios';
//
// const AdultVerification = () => {
//     useEffect(() => {
//         const loadScript = src => {
//             const script = document.createElement('script');
//             script.src = src;
//             document.body.appendChild(script);
//             return () => {
//                 document.body.removeChild(script);
//             };
//         };
//         loadScript("https://code.jquery.com/jquery-3.3.1.min.js");
//         loadScript("https://cdn.iamport.kr/v1/iamport.js");
//     }, []);
//
//     const handleCertification = () => {
//         const { IMP } = window; // 아임포트 라이브러리 초기화
//         IMP.init("imp81433431"); // 발급받은 키로 초기화
//
//         IMP.certification({
//             pg: "inicis_unified",
//             merchant_uid: `merchant_${new Date().getTime()}`,
//             popup: true
//         }, (response) => {
//             if (response.success) {
//                 // 서버로 인증 정보 전송
//                 axios.post("/api/verify", { imp_uid: response.imp_uid })
//                     .then(res => console.log('Server response:', res.data))
//                     .catch(err => console.error('Error posting verification:', err));
//             } else {
//                 alert(`인증 실패: ${response.error_msg}`);
//             }
//         });
//     };
//
//     return (
//         <div>
//             <h1>본인 인증</h1>
//             <button onClick={handleCertification}>인증하기</button>
//         </div>
//     );
// };
//
// export default AdultVerification;