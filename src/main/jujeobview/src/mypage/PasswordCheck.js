import {useEffect, useState} from "react";
import axios from "axios";


function PasswordCheck({ onSubmit}) {
    const loginMemberData = JSON.parse(localStorage.getItem('loginMemberData'));

    const [password, setPassword] = useState('');
    console.log(loginMemberData)

    useEffect(() => {
        console.log("로그인 성공한 회원 정보:", loginMemberData);
    }, [loginMemberData]);


    const passwordSubmit = async () => {
        const memId = localStorage.getItem('memId')
        console.log(memId)

        if (!memId) {
            alert('PasswordCheck.js : 로그인 ID를 찾을 수 없습니다')
            return
        }

        try {
            const response = await axios.post('/api/verifyPassword', {
                memId: memId,
                memPw: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT 토큰을 헤더에 추가
                }
            })

            if (response.data.success) {
                alert("비밀번호 확인 성공");
                onSubmit(true) // 부모 컴포넌트로 성공 상태 전달
            } else {
                alert("비밀번호가 일치하지 않습니다")
                onSubmit(false) // 실패 상태 전달
            }
        } catch (error) {
            console.error('비밀번호 검증 실패:', error)
            alert("PasswordCheck.js : 서버 오류가 발생했습니다. 비밀번호 검증 실패")
            onSubmit(false); // 에러 상태 전달
        }
    }


    return (
        // <div>
        //     <input type="password" placeholder="회원정보를 수정하려면 비밀번호 입력" value={password}
        //            onChange={e => setPassword(e.target.value)}
        //     />
        //     <button onClick={passwordSubmit}>확인</button>
        // </div>

        <form onSubmit={(e) => {
            e.preventDefault();
            passwordSubmit();
        }}>
            <div>
                <input
                    type="password"
                    placeholder="회원정보를 수정하려면 비밀번호 입력"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    aria-label="비밀번호 입력"
                />
                <button type="submit">확인</button>
            </div>
        </form>
    )
}

export default PasswordCheck