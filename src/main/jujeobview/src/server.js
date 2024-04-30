const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// "/certifications"에 대한 POST 요청을 처리하는 controller
app.post("/certifications", async (request, response) => {
    // request의 body에서 imp_uid 추출
    const { imp_uid } = request.body;
    try {
        // 인증 토큰 발급 받기
        // 아임포트에서 액세스 토큰 발급 받기
        const getToken = await axios.post("https://api.iamport.kr/users/getToken", {
            imp_key: "6625177213832842", // 실제 사용할 API 키
            imp_secret: "fQcJVhbwGTVi5EFHMnfmhS288WdJDgJ0U5yDHAmbos92MltOfSrBdBZQCWxexlCXK95oxdciZSEdOsId", // 실제 사용할 API 시크릿
        });

        // 인증 토큰
        const { access_token } = getToken.data;

        // imp_uid로 인증 정보 조회
        const getCertifications = await axios.get(`https://api.iamport.kr/certifications/${imp_uid}`, {
            headers: { Authorization: access_token },
        });

        // 연령 검증 로직 구현
        const birthYear = new Date(birth).getFullYear();
        const isAdult = (new Date().getFullYear() - birthYear) >= 19;

        // 결과 응답
        response.status(200).json({
            success: true,
            data: {
                name,
                isAdult,
            },
        });

    } catch (e) {
        console.error('Error processing certification:', e);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// 서버 포트 3000에서 실행
app.listen(3000, () => console.log('Server running on port 3000'));