import './Profile.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

function Profile() {

    const memberToken = JSON.parse(localStorage.getItem('token'));
    console.log("멤버토큰", memberToken)
    const [userData, setUserData] =useState(null)

    // const [profile, setProfile] = useState({
    //     memId: '',
    //     memNickname: '',
    //     memName: '',
    //     memPhone: '',
    //     memEmail: '',
    //     memAddr: ''
    // })

    // const [memPw, setMemPw] = useState('')
    // const [memPwConfirm, setMemPwConfirm] = useState('')


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
    // const showMemberInfo = (e) => {
    //     // name은 필드값, value는 사용자 입력값
    //     const { name, value } = e.target;
    //     setProfile(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // 비밀번호 입력 관리
    // const memPwChange = (e) => {
    //     setMemPw(e.target.value);
    // };
    //
    // // 비밀번호 확인 입력 관리
    // const memPwConfirmChange = (e) => {
    //     setMemPwConfirm(e.target.value);
    // };


    // const updateProfileSubmit = (e) => {
    //     e.preventDefault();  // 폼 제출 시 페이지 리로드 방지
    //     axios.post('/api/updateProfile', {
    //         memId, memPw, memNickname, memName, memPhone, memEmail, memAddr
    //     })
    //         .then(response => {
    //             alert('회원 정보가 성공적으로 업데이트되었습니다.');
    //         })
    //         .catch(error => {
    //             console.error('회원정보 수정 실패:', error);
    //             alert('회원 정보 업데이트에 실패했습니다.');
    //         });
    // }



    return (
        <form>
            <div className={"MemberInfo"}>
                {userData ? (
                    <div className={"MemberId"}>
                        <div className={"MemberLabel"}><label htmlFor="memId">아이디</label></div>
                        <div className={"MemberInput"}>
                            <input type="text" id="memId" name={"memId"} value={ userData.memberId } readOnly/>
                        </div>
                    </div>
                ) : ('')}

                {/*<div className={"MemberPw"}>*/}
                {/*    <div className={"MemberLabel"}><label htmlFor="memPw">비밀번호</label></div>*/}
                {/*    <div className={"MemberInput"}>*/}
                {/*        <input type="password" id="memPw" value={memPw}  />*/}
                {/*    </div>*/}
                {/*    {memPw && memPw.length < 10 && (*/}
                {/*        <p>10자리 이상</p>*/}
                {/*    )}*/}
                {/*    {!/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(memPw) && memPw.length >= 10 && (*/}
                {/*        <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>*/}
                {/*    )}*/}
                {/*</div>*/}

                {/*<div className={"MemberPwConfirm"}>*/}
                {/*    <div className={"MemberLabel"}><label htmlFor="memPwConfirm">비밀번호 확인</label></div>*/}
                {/*    <div className={"MemberInput"}>*/}
                {/*        <input type="password" id="memPwConfirm" value={memPwConfirm} />*/}
                {/*    </div>*/}
                {/*    {memPw && memPwConfirm && memPw !== memPwConfirm && (*/}
                {/*        <p>동일한 비밀번호를 입력해주세요</p>*/}
                {/*    )}*/}
                {/*</div>*/}


                <div className={"MemberNickname"}>
                    <div className={"MemberLabel"}><label htmlFor="memNickname">닉네임</label></div>
                    <div className={"MemberInput"}>
                        <input type="text" id="memNickname" name={"memNickname"} defaultValue={ userData && userData.memberNickname ? userData.memberNickname : '' } />
                    </div>
                </div>


                {userData ? (
                    <div className={"MemberName"}>
                        <div className={"MemberLabel"}><label htmlFor="memName">이름</label></div>
                        <div className={"MemberInput"}>
                            <input type="text" id="memName" name={"memName"} defaultValue={ userData.memberName } />
                        </div>
                    </div>
                ) : ('')}

                {userData ? (
                    <div className={"MemberEmail"}>
                        <div className={"MemberLabel"}><label htmlFor="memEmail">이메일</label></div>
                        <div className={"MemberInput"}>
                            <input type="email" id="memEmail" name={"memEmail"} defaultValue={ userData.memberEmail } />
                        </div>
                    </div>
                ) : ('')}

                {userData ? (
                    <div className={"MemberPhone"}>
                        <div className={"MemberLabel"}><label htmlFor="memPhone">전화번호</label></div>
                        <div className={"MemberInput"}>
                            <input type="text" id="memPhone" name={"memPhone"} defaultValue={ userData.memberPhone } />
                        </div>
                    </div>
                ) : ('')}

                {userData ? (
                    <div className={"MemberAddr"}>
                        <div className={"MemberLabel"}><label htmlFor="memAddr">주소</label></div>
                        <div className={"MemberInput"}>
                            <input type="text" id="memAddr" name={"memAddr"} defaultValue={ userData.memberAddr } />
                        </div>
                    </div>
                ) : ('')}

                {userData ? (
                    <div className={"BtnGroup"}>
                        <div className={"SubmitBtn"}>
                            <button type="submit">탈퇴하기</button>
                        </div>
                        <div className={"SubmitBtn"}>
                            <button type="submit">회원정보수정</button>
                        </div>
                    </div>
                ) : ('')}

            </div>
        </form>

    )
}

export default Profile