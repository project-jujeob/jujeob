/*
import './Profile.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

function Profile() {

    const accessToken = localStorage.getItem('accessToken');
    const[, payloadBase64] = accessToken.split(".")
    const payloadString = base64DecodeUnicode(payloadBase64)
    const payload = JSON.parse(payloadString)

    const [userData, setUserData] =useState(null)
    const [profile, setProfile] = useState({
        userId: '',
        password: "",
        passwordConfirm: "",
        nickname: '',
        name: '',
        phone: '',
        email: '',
        address: ''
    })


    // 회원정보 조회
    useEffect(() => {
        axios.get('/api/user/profile',{
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                console.log("응답", response.data)
                console.log(payload)
                console.log(payload.userNo)
                console.log("userId", payload.userId)
                console.log("nickname" + payload.nickname)
                console.log(payload.name)
                console.log(payload.email)
                console.log(payload.phone)
                console.log(payload.address)

                setUserData({
                    userNo : payload.userNo,
                    userId : payload.userId,
                    role : payload.role,
                    nickname : payload.nickname,
                    name : payload.name,
                    email : payload.email,
                    phone : payload.phone,
                    address : payload.address
                })

                // const { userId, nickname, name, email, phone, address } = response.data;
                // setProfile({
                //     userId, nickname, name, phone, email, address
                // });
            })
            .catch(error => {
                console.log('조회실패 :', error)
            });
    }, [accessToken]);

    console.log("userData확인하기", userData)

    // 비번제외한 값 관리
    // const showUserInfo = (e) => {
    //     // name은 필드값, value는 사용자 입력값
    //     const { name, value } = e.target;
    //     setProfile(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    const [passwordMatch, setPasswordMatch] = useState(true)
    // 비번, 비번확인 유효성
    const profilePasswordChange = (e) => { //
        const { name, value } = e.target

        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password' || name === 'PasswordConfirm') {
            // 비밀번호 또는 비밀번호 확인 필드가 변경되었을 때, 두 필드의 값이 일치하는지 검사
            const newPassword = name === 'password' ? value : profile.password;
            const newPasswordConfirm = name === 'passwordConfirm' ? value : profile.passwordConfirm;
            setPasswordMatch(newPassword === newPasswordConfirm);
        }
    }

    // 회원정보 수정
    const updateProfileSubmit = (e) => {
        e.preventDefault();  // 폼 제출 시 페이지 리로드 방지
        axios.patch('/api/user/profileUpdate', profile, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log("업데이트 성공", response)
                alert('회원 정보가 성공적으로 업데이트되었습니다.');
                // 로컬 스토리지의 사용자 정보 업데이트
                localStorage.setItem('userInfo', JSON.stringify(response.data));

                window.location.reload();  // 현재 페이지 새로 고침
            })
            .catch(error => {
                console.error('회원정보 수정 실패:', error);
                alert('회원 정보 업데이트에 실패했습니다.');
            });
    }




    return (
        <form onSubmit={updateProfileSubmit}>
            <div className={"UserInfo"}>
                {userData ? (
                    <div>

                <div className={"UserId"}>
                    <div className={"UserLabel"}><label htmlFor="userId">아이디</label></div>
                    <div className={"UserInput"}>
                        <input type="text" id="userId" name={"userId"} value={ userData.userId } readOnly/>
                    </div>
                </div>

                <div className={"Password"}>
                    <div className={"UserLabel"}><label htmlFor="password">비밀번호</label></div>
                    <div>
                        <div className={"UserInput"}>
                            <input type={"password"} id={"password"} placeholder={"새 비밀번호를 입력해주세요"} name={"password"}
                                   onChange={profilePasswordChange} required={true}/><br/>
                        </div>
                        <div>
                            {profile.password && profile.password.length < 10 && (
                                <p>10자리 이상</p>
                            )}
                            {profile.password.length >= 10 && !/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(profile.password) && (
                                <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"PasswordConfirm"}>
                    <div className={"UserLabel"}><label htmlFor="passwordConfirm">비밀번호 확인</label></div>
                    <div>
                        <div className={"UserInput"}>
                            <input type={"password"} id={"passwordConfirm"} placeholder={"새 비밀번호를 다시 입력해주세요"}
                                   name={"passwordConfirm"} onChange={profilePasswordChange} required={true}/><br/>
                        </div>
                        <div >
                            {profile.password && profile.passwordConfirm && !passwordMatch && (
                                <p>동일한 비밀번호를 입력해주세요</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={"Nickname"}>
                    <div className={"UserLabel"}><label htmlFor="nickname">닉네임</label></div>
                    <div className={"UserInput"}>
                        <input type="text" id="nickname" name={"nickname"} defaultValue={ userData && userData.nickname ? userData.nickname : '' } />
                    </div>
                </div>

                <div className={"Name"}>
                    <div className={"UserLabel"}><label htmlFor="name">이름</label></div>
                    <div className={"UserInput"}>
                        <input type="text" id="name" name={"name"} defaultValue={ userData.name } />
                    </div>
                </div>

                <div className={"Email"}>
                    <div className={"UserLabel"}><label htmlFor="email">이메일</label></div>
                    <div className={"UserInput"}>
                        <input type="email" id="email" name={"email"} defaultValue={ userData.email } />
                    </div>
                </div>

                <div className={"Phone"}>
                    <div className={"UserLabel"}><label htmlFor="phone">전화번호</label></div>
                    <div className={"UserInput"}>
                        <input type="text" id="phone" name={"phone"} defaultValue={ userData.phone } />
                    </div>
                </div>

                <div className={"Address"}>
                    <div className={"UserLabel"}><label htmlFor="address">주소</label></div>
                    <div className={"UserInput"}>
                        <input type="text" id="address" name={"address"} defaultValue={ userData.address } />
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

function base64DecodeUnicode(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}*/
