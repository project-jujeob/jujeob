// import React, { useEffect } from 'react';
// import {useNavigate} from "react-router-dom";
//
// const IdentityVerification = () => {
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // jQuery 로드
//         const jQueryScript = document.createElement('script');
//         jQueryScript.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
//         jQueryScript.async = true;
//         document.head.appendChild(jQueryScript);
//
//         // iamport 외부 스크립트 로드
//         const iamportScript = document.createElement('script');
//         iamportScript.src = 'https://cdn.iamport.kr/v1/iamport.js';
//         iamportScript.async = true;
//         document.head.appendChild(iamportScript);
//
//         // 컴포넌트가 언마운트될 때 스크립트 제거
//         return () => {
//             document.head.removeChild(jQueryScript);
//             document.head.removeChild(iamportScript);
//         };
//     }, []);
//
//     const requestKg = () => {
//         if (window.jQuery && window.IMP) {
//             window.IMP.init("imp81433431");
//             window.IMP.certification({
//                 pg: "inicis_unified",
//                 merchant_uid: "test_lu9uzy8d",
//                 popup: true,
//             }, function(rsp) {
//                 if (rsp.success) {
//                     alert('인증에 성공했습니다.');
//                     // 서버로 인증 정보 전송
//                     window.jQuery.ajax({
//                         url: "/api/verify-identity",  // 여기는 실제 서버의 엔드포인트로 수정해야 합니다.
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         data: JSON.stringify({ imp_uid: rsp.imp_uid }),
//                         success: function(response) {
//                             console.log("서버 응답:", response);
//                             // 필요한 로직 추가
//                         },
//                         error: function(xhr, status, error) {
//                             console.error("서버 응답 실패:", status, error);
//                         }
//                     });
//                     navigate("/Register");
//                 } else {
//                     alert('인증에 실패했습니다. 에러 메시지: ' + rsp.error_msg);
//                 }
//             });
//         } else {
//             alert('외부 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
//         }
//     };
//
//     /*// 이니시스 인증 요청 함수
//     const requestKg = () => {
//         if (window.jQuery && window.IMP) {
//             window.IMP.init("imp81433431");
//             window.IMP.certification({
//                 pg: "inicis_unified",
//                 merchant_uid: "test_lu9uzy8d",
//                 popup: true,
//             }, function(rsp) {
//                 if (rsp.success) {
//                     alert('인증에 성공했습니다.');
//                     navigate("/Register");
//                 } else {
//                     alert('인증에 실패했습니다. 에러 메시지: ' + rsp.error_msg);
//                 }
//             });
//         } else {
//             alert('외부 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
//         }
//     };*/
//
//     return (
//         <div id="contents">
//             <h1>본인인증</h1>
//             <p>
//                 네이버, 카톡, PASS인증, 삼성패스, KB국민인증, 신한인증, PAYCO, 토스 인증 (테스트는 가능) <br />
//                 <button onClick={requestKg}>본인인증(이니시스)</button>
//             </p>
//         </div>
//     );
// };
//
// export default IdentityVerification;