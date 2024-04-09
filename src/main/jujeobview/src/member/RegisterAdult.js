import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function RegisterAdult() {
    useEffect(() => {
        // 외부 스크립트를 동적으로 로드합니다.
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/v1/iamport.js";
        script.async = true;
        document.body.appendChild(script);

        // iamport 초기화
        script.onload = () => {
            IMP.init(imp81433431);
        };

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const requestCert = () => {
        // 인증 요청
        IMP.certification({
            pg: "",
            merchant_uid: "",
        });
    };

    return (
        <>
            <button onClick={requestCert}>성인인증하기</button>
            <Link to={"/Register"}>
                <button>회원가입</button>
            </Link>
        </>
    );
}

export default RegisterAdult;
