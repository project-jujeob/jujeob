import './Profile.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

function Profile() {

    const memberToken = JSON.parse(localStorage.getItem('token'));
    console.log("멤버토큰", memberToken)
    const [userData, setUserData] =useState(null)

    const [profile, setProfile] = useState({
        memId: '',
        memPw: "",
        memPwConfirm: "",
        memNickname: '',
        memName: '',
        memPhone: '',
        memEmail: '',
        memAddr: ''
    })


    // 회원정보 조회
    useEffect(() => {
        axios.get('/api/member/info',{
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${memberToken}`
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log("응답", response.data)

                const[, payloadBase64] = memberToken.split(".")
                const payloadString = atob(payloadBase64)
                const payload = JSON.parse(payloadString)

                console.log(payload)
                console.log(payload.memberNo)
                console.log("memberId", payload.memberId)
                console.log("memberNickname" + payload.memberNickname)
                console.log(payload.memberName)
                console.log(payload.memberEmail)
                console.log(payload.memberPhone)
                console.log(payload.memberAddr)

                setUserData({
                    memberNo : payload.memberNo,
                    memberId : payload.memberId,
                    memberRole : payload.memberRole,
                    memberNickname : payload.memberNickname,
                    memberName : payload.memberName,
                    memberEmail : payload.memberEmail,
                    memberPhone : payload.memberPhone,
                    memberAddr : payload.memberAddr
                })

                // const { memId, memNickname, memName, memEmail, memPhone, memAddr } = response.data;
                // setProfile({
                //     memId, memNickname, memName, memPhone, memEmail, memAddr
                // });
            })
            .catch(error => {
                console.log('조회실패 :', error)
            });
    }, [memberToken]);

    console.log("userData확인하기", userData)

    // 비번제외한 값 관리
    const showMemberInfo = (e) => {
        // name은 필드값, value는 사용자 입력값
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [passwordMatch, setPasswordMatch] = useState(true)
    // 비번, 비번확인 유효성
    const profileMemPwChange = (e) => { //
        const { name, value } = e.target

        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'memPw' || name === 'memPwConfirm') {
            // 비밀번호 또는 비밀번호 확인 필드가 변경되었을 때, 두 필드의 값이 일치하는지 검사
            const newPassword = name === 'memPw' ? value : profile.memPw;
            const newPasswordConfirm = name === 'memPwConfirm' ? value : profile.memPwConfirm;
            setPasswordMatch(newPassword === newPasswordConfirm);
        }

    }


    // 회원정보 수정
    const updateProfileSubmit = (e) => {
        e.preventDefault();  // 폼 제출 시 페이지 리로드 방지
        axios.put('/api/member/updateProfile', profile, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${memberToken}`
            }
        })
            .then(response => {
                console.log("업데이트 성공", response)
                alert('회원 정보가 성공적으로 업데이트되었습니다.');
                // 로컬 스토리지의 사용자 정보 업데이트
                localStorage.setItem('userInfo', JSON.stringify(response.data));

                // 토큰 업데이트
                // localStorage.setItem('token', response.data);

                window.location.reload();  // 현재 페이지 새로 고침
            })
            .catch(error => {
                console.error('회원정보 수정 실패:', error);
                alert('회원 정보 업데이트에 실패했습니다.');
            });
    }




    return (
        <form onSubmit={updateProfileSubmit}>
            <div className={"MemberInfo"}>
                {userData ? (
                    <div>

                <div className={"MemberId"}>
                    <div className={"MemberLabel"}><label htmlFor="memId">아이디</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memId" name={"memId"} value={ userData.memberId } readOnly/>
                    </div>
                </div>

                <div className={"MemberPw"}>
                    <div className={"MemberLabel"}><label htmlFor="memPw">비밀번호</label></div>
                    <div  className={"ProfileMemberPwDiv"}>
                        <div className={"MemberInput"}>
                            <input type={"password"} id={"memPw"} placeholder={"새 비밀번호를 입력해주세요"} name={"memPw"}
                                   onChange={profileMemPwChange} required={true}/><br/>
                        </div>
                        <div className={"MemberPwProfile"}>
                            {profile.memPw && profile.memPw.length < 10 && (
                                <p>10자리 이상</p>
                            )}
                            {profile.memPw.length >= 10 && !/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(profile.memPw) && (
                                <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"MemberPwConfirm"}>
                    <div className={"MemberLabel"}><label htmlFor="memPwConfirm">비밀번호 확인</label></div>
                    <div  className={"ProfileMemberPwDiv"}>
                        <div className={"MemberInput"}>
                            <input type={"password"} id={"memPwConfirm"} placeholder={"새 비밀번호를 다시 입력해주세요"}
                                   name={"memPwConfirm"} onChange={profileMemPwChange} required={true}/><br/>
                        </div>
                        <div className={"MemberPwProfile"}>
                            {profile.memPw && profile.memPwConfirm && !passwordMatch && (
                                <p>동일한 비밀번호를 입력해주세요</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"MemberNickname"}>
                    <div className={"MemberLabel"}><label htmlFor="memNickname">닉네임</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memNickname" name={"memNickname"} defaultValue={ userData && userData.memberNickname ? userData.memberNickname : '' } />
                    </div>
                </div>

                <div className={"MemberName"}>
                    <div className={"MemberLabel"}><label htmlFor="memName">이름</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memName" name={"memName"} defaultValue={ userData.memberName } />
                    </div>
                </div>

                <div className={"MemberEmail"}>
                    <div className={"MemberLabel"}><label htmlFor="memEmail">이메일</label></div>
                    <div className={"MemberInput"}>
                        <input type="email" id="memEmail" name={"memEmail"} defaultValue={ userData.memberEmail } />
                    </div>
                </div>

                <div className={"MemberPhone"}>
                    <div className={"MemberLabel"}><label htmlFor="memPhone">전화번호</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memPhone" name={"memPhone"} defaultValue={ userData.memberPhone } />
                    </div>
                </div>

                <div className={"MemberAddr"}>
                    <div className={"MemberLabel"}><label htmlFor="memAddr">주소</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memAddr" name={"memAddr"} defaultValue={ userData.memberAddr } />
                    </div>
                </div>

                <div className={"BtnGroup"}>
                    <div className={"SubmitBtn"}>
                        <button type="submit">탈퇴하기</button>
                    </div>
                    <div className={"SubmitBtn"}>
                        <button type="submit">회원정보수정</button>
                    </div>
                </div>
                    </div>
            ) : ('')}

            </div>
        </form>

    )
}

export default Profile
