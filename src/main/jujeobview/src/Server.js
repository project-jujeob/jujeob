require('dotenv').config();
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
            imp_key: process.env.IAMPORT_KEY,
            imp_secret: process.env.IAMPORT_SECRET,
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
        if (e.response) { // 외부 API에서 반환한 오류 응답이 있을 경우
            console.log('API Response Error:', e.response.data); // 외부 API의 오류 응답 내용을 로그로 출력
        }
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

console.log("IAMPORT_KEY:", process.env.IAMPORT_KEY);
console.log("IAMPORT_SECRET:", process.env.IAMPORT_SECRET);

app.listen(4000, () => console.log('Server running on port 4000'));