import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from "axios";
import Header from "../common/Header";
import RegisterModal from "./RegisterModal";

// function Register() {  //회원가입폼에 입력받을 데이터
//     const [registerData, setRegisterData] = useState({
//         memId: "",
//         memPw: "",
//         memPwConfirm: "",
//         memNickname: "",
//         memName: "",
//         memPhone: "",
//         memEmail: "",
//         memAddr: ""
//     });
//
//
//     // 중복검사 모달
//     const [idCheck, setIdCheck] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');
//
//     // 아이디 중복검사
//     function checkMemId(e) {
//         e.preventDefault()
//         if (!registerData.memId) {
//             alert("아이디를 입력하세요.")
//             return
//         }
//
//         axios.get(`/api/checkMemId?memId=${registerData.memId}`)
//             .then(response => {
//                 setIdCheck(response.data.available)
//                 if (response.data.available) {
//                     setModalMessage("사용 가능한 아이디입니다.")
//                 } else {
//                     setModalMessage("이미 사용 중인 아이디입니다.")
//                 }
//                 setShowModal(true)
//             })
//             .catch(error => {
//                 console.error("중복 확인 중 오류 발생", error)
//                 setModalMessage("중복 확인 중 오류가 발생했습니다.")
//                 setShowModal(true)
//             })
//     }
//
//
//     const [passwordMatch, setPasswordMatch] = useState(true)
//
//     // 비번, 비번확인 유효성(실시간확인)
//     const registerDataChange = (e) => { //
//         const { name, value } = e.target
//
//         setRegisterData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//
//         if (name === 'memPw' || name === 'memPwConfirm') {
//             // 비밀번호 또는 비밀번호 확인 필드가 변경되었을 때, 두 필드의 값이 일치하는지 검사
//             const newPassword = name === 'memPw' ? value : registerData.memPw;
//             const newPasswordConfirm = name === 'memPwConfirm' ? value : registerData.memPwConfirm;
//             setPasswordMatch(newPassword === newPasswordConfirm);
//         }
//
//         // 아이디 필드가 변경되면 중복 검사 결과를 초기화
//         if (name === 'memId') {
//             setIdCheck(null);
//         }
//     }
//
//     //회원가입
//     const registerAction = (e) => {
//         e.preventDefault()
//
//         if (Object.values(registerData).some(value => !value)) {
//             alert("입력 필드를 모두 채워주세요.")
//             return; // 함수 종료
//         }
//
//         axios({
//             method: "post",
//             url: "/api/register",
//             data: JSON.stringify(registerData),
//             headers: {'Content-Type': 'application/json'}
//         }).then((response) => {
//             alert("성공")
//             console.log(response.data);
//             window.location.href = "/RegisterComplete"
//         }).catch(error => {
//             alert("실패")
//             console.log(error)
//         });
//     }
//
//     return (
//         <form>
//             <div>
//                 <Header/>
//                 <div className={"RegisterPage"}>
//                     <div className={"RegisterForm"}>
//                         <h1>회원가입</h1><br/>
//                         <div className={"hr"}></div>
//                         <br/>
//                         <div className={"RegisterMemberId"}>
//                             <RegisterModal isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} />
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memId"}>아이디</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"text"} id={"memId"} placeholder={"아이디를 입력해주세요"} name={"memId"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                             <div>
//                                 <button onClick={checkMemId}>중복확인</button>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberPw"}>
//
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memPw"}>비밀번호</label></div>
//                             <div className={"RegisterMemberPwDiv"}>
//                                 <div className={"RegisterMemberInput"}>
//                                     <input type={"password"} id={"memPw"} placeholder={"비밀번호를 입력해주세요"} name={"memPw"}
//                                            onChange={registerDataChange} required={true}/><br/>
//                                 </div>
//                                 <div className={"MemberPwRegister"}>
//                                     {registerData.memPw && registerData.memPw.length < 10 && (
//                                         <p>10자리 이상</p>
//                                     )}
//                                     {registerData.memPw.length >= 10 && !/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(registerData.memPw) && (
//                                         <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={"RegisterMemberPwConfirm"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memPwConfirm"}>비밀번호 확인</label></div>
//                                 <div className={"RegisterMemberPwDiv"}>
//                                 <div className={"RegisterMemberInput"}>
//                                     <input type={"password"} id={"memPwConfirm"} placeholder={"비밀번호를 다시 입력해주세요"}
//                                            name={"memPwConfirm"} onChange={registerDataChange} required={true}/><br/>
//                                 </div>
//                                 <div className={"MemberPwRegister"}>
//                                     {registerData.memPw && registerData.memPwConfirm && !passwordMatch && (
//                                         <p>동일한 비밀번호를 입력해주세요</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberNickname"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memNickname"}>닉네임</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"text"} id={"memNickname"} placeholder={"닉네임을 입력해주세요"} name={"memNickname"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberName"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memName"}>이름</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"text"} id={"memName"} placeholder={"이름을 입력해주세요"} name={"memName"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberPhone"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memPhone"}>전화번호</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"text"} id={"memPhone"} placeholder={"숫자만 입력해주세요"} name={"memPhone"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberEmail"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memEmail"}>이메일</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"email"} id={"memEmail"} placeholder={"예: jujeob@ssada.com"} name={"memEmail"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterMemberAddr"}>
//                             <div className={"RegisterMemberLabel"}><label htmlFor={"memAddr"}>주소</label></div>
//                             <div className={"RegisterMemberInput"}>
//                                 <input type={"text"} id={"memAddr"} placeholder={"주소를 입력해주세요"} name={"memAddr"}
//                                        onChange={registerDataChange} required={true}/><br/>
//                             </div>
//                         </div>
//
//                         <div className={"RegisterFormBtnGroup"}>
//                             <div className={"RegisterFormSubmitBtn"}>
//                                 <button onClick={registerAction}>가입하기</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     )
// }

function Register() {  //회원가입폼에 입력받을 데이터
    const [registerData, setRegisterData] = useState({
        userId: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        name: "",
        phone: "",
        email: "",
        address: ""
    });


    const [userIdCheck, setUserIdCheck] = useState(null);
    const [emailCheck, setEmailCheck] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성
    const [emailValid, setEmailValid] = useState(true); // 이메일 유효성


    // 아이디 중복검사
    function checkUserId(e) {
        e.preventDefault()
        if (!registerData.userId) {
            alert("아이디를 입력하세요.")
            return
        }
        axios.get(`/api/auth/checkUserId?userId=${registerData.userId}`)
            .then(response => {
                const isAvailable = response.data.available; // 백엔드에서 "available" 속성을 포함한 응답을 받음
                setUserIdCheck(isAvailable)     //isAvailable 값을 상태로 저장
                setModalMessage(isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.")    //// 모달 메시지 설정
                setShowModal(true)
            })
            .catch(error => {
                console.error("중복 확인 중 오류 발생", error);
                let message = "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                if (error.response && error.response.status === 404) {
                    message = "서버를 찾을 수 없습니다. 관리자에게 문의하세요.";
                }
                setModalMessage(message);
                setShowModal(true);
            })
    }

    // 이메일 중복검사
    function checkUserEmail(e) {
        e.preventDefault()
        if (!registerData.email) {
            alert("아이디를 입력하세요.")
            return
        }
        axios.get(`/api/auth/checkUserEmail?email=${registerData.email}`)
            .then(response => {
                const isAvailable = response.data.available; // 백엔드에서 "available" 속성을 포함한 응답을 받음
                setEmailCheck(isAvailable)     //isAvailable 값을 상태로 저장
                setModalMessage(isAvailable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다.")    //// 모달 메시지 설정
                setShowModal(true)
            })
            .catch(error => {
                console.error("중복 확인 중 오류 발생", error);
                let message = "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                if (error.response && error.response.status === 404) {
                    message = "서버를 찾을 수 없습니다. 관리자에게 문의하세요.";
                }
                setModalMessage(message);
                setShowModal(true);
            })
    }


    // 비번, 비번확인 유효성(실시간확인)
    // useEffect(() => {
    //     const passwordRegex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/;
    //     setPasswordMatch(registerData.password === registerData.passwordConfirm && passwordRegex.test(registerData.password));
    // }, [registerData.password, registerData.passwordConfirm]);

    // 유효성검사
    const registerDataChange = (e) => { //
        const { name, value } = e.target

        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }))

        // 아이디 필드가 변경되면 중복 검사 결과를 초기화
        if (name === 'userId') {
            setUserIdCheck(null)
        }

        // 비밀번호 또는 비밀번호 확인 필드가 변경되었을 때, 두 필드의 값이 일치하는지 검사. 실시간
        if (name === 'password' || name === 'passwordConfirm') {
            const newPassword = name === 'password' ? value : registerData.password
            const newPasswordConfirm = name === 'passwordConfirm' ? value : registerData.passwordConfirm
            setPasswordMatch(newPassword === newPasswordConfirm)

            // 비밀번호 유효성 검사
            const passwordRegex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/;
            setPasswordValid(passwordRegex.test(newPassword));
        }

        //이메일 유효성
        if (name === 'email') {
            setEmailValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value));
        }

    }

    //회원가입
    const registerAction = (e) => {
        e.preventDefault()

        // 필수 입력 필드 확인
        const requiredFields = [
            registerData.userId, registerData.password, registerData.passwordConfirm, registerData.nickname, registerData.name, registerData.email
        ];
        if (requiredFields.some(value => !value)) {
            alert("필수 입력 필드를 모두 채워주세요.");
            return;
        }

        if (userIdCheck === null) {
            alert("아이디 중복 검사를 진행해주세요.");
            return;
        }
        if (userIdCheck === false) {
            alert("이미 사용 중인 아이디입니다. 다른 아이디를 사용해주세요.");
            return;
        }


        if (!passwordValid || !passwordMatch) {
            alert("비밀번호가 유효하지 않거나 일치하지 않습니다.");
            return;
        }

        if (emailCheck === null) {
            alert("이메일 중복 검사를 진행해주세요.");
            return;
        }
        if (emailCheck === false) {
            alert("이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.");
            return;
        }
        if (!emailValid) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }



        axios({
            method: "post",
            url: "/api/auth/register",
            data: JSON.stringify(registerData),
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            alert("성공")
            console.log(response.data);
            window.location.href = "/RegisterComplete"
        }).catch(error => {
            alert("실패")
            console.log(error)
        });
    }

    return (
        <form>
            <div>
                <Header/>
                <div className={"RegisterPage"}>
                    <div className={"RegisterForm"}>
                        <h1>회원가입</h1><br/>
                        <div className={"hr"}></div>
                        <br/>

                        <div className={"RegisterMemberId"}>
                            <RegisterModal isOpen={showModal} message={modalMessage}
                                           onClose={() => setShowModal(false)}/>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"userId"}>아이디<span className={"RegisterMemberIdSpan"}>*</span></label></div>
                            <div className={"RegisterMemberInput"}>
                                <input type={"text"} id={"userId"} placeholder={"아이디를 입력해주세요"} name={"userId"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                            <div>
                                <button onClick={checkUserId}>중복확인</button>
                            </div>
                        </div>

                        <div className={"RegisterMemberPw"}>

                            <div className={"RegisterMemberLabel"}><label htmlFor={"password"}>비밀번호<span className={"RegisterMemberPwSpan"}>*</span></label></div>
                            <div className={"RegisterMemberPwDiv"}>
                                <div className={"RegisterMemberInput"}>
                                    <input type={"password"} id={"password"} placeholder={"비밀번호를 입력해주세요"}
                                           name={"password"}
                                           onChange={registerDataChange} required={true}/><br/>
                                </div>
                                <div className={"MemberPwRegister"}>
                                    {registerData.password && registerData.password.length < 10 && (
                                        <p>10자리 이상</p>
                                    )}
                                    {registerData.password.length >= 10 && !/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(registerData.password) && (
                                        <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={"RegisterMemberPwConfirm"}>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"passwordConfirm"}>비밀번호 확인<span className={"RegisterMemberPwConfirmSpan"}>*</span></label>
                            </div>
                            <div className={"RegisterMemberPwDiv"}>
                                <div className={"RegisterMemberInput"}>
                                    <input type={"password"} id={"passwordConfirm"} placeholder={"비밀번호를 다시 입력해주세요"}
                                           name={"passwordConfirm"} onChange={registerDataChange} required={true}/><br/>
                                </div>
                                <div className={"MemberPwRegister"}>
                                    {registerData.password && registerData.passwordConfirm && !passwordMatch && (
                                        <p>동일한 비밀번호를 입력해주세요</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={"RegisterMemberNickname"}>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"nickname"}>닉네임<span className={"RegisterMemberIdSpan"}>*</span></label></div>
                            <div className={"RegisterMemberInput"}>
                                <input type={"text"} id={"Nickname"} placeholder={"닉네임을 입력해주세요"} name={"nickname"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"RegisterMemberName"}>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"name"}>이름<span className={"RegisterMemberNameSpan"}>*</span></label></div>
                            <div className={"RegisterMemberInput"}>
                                <input type={"text"} id={"name"} placeholder={"이름을 입력해주세요"} name={"name"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"RegisterMemberEmail"}>
                            <RegisterModal isOpen={showModal} message={modalMessage}
                                           onClose={() => setShowModal(false)}/>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"email"}>이메일<span className={"RegisterMemberIdSpan"}>*</span></label></div>
                            <div className={"RegisterMemberInput"}>
                                <input type={"email"} id={"email"} placeholder={"예: jujeob@ssada.com"} name={"email"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                            <div>
                                <button onClick={checkUserEmail}>중복확인</button>
                            </div>
                        </div>

                        <div className={"RegisterMemberPhone"}>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"phone"}>전화번호</label></div>
                            <div className={"RegisterMemberInput"}>
                                <input type={"text"} id={"phone"} placeholder={"숫자만 입력해주세요"} name={"phone"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"RegisterMemberAddr"}>
                            <div className={"RegisterMemberLabel"}><label htmlFor={"address"}>주소</label></div>
                            <div className={"RegisterMemberInput"}>
                                {/*<input type={"text"} id={"address"} placeholder={"주소를 입력해주세요"} name={"address"}*/}
                                {/*       onChange={registerDataChange} required={true}/><br/>*/}
                                <button>주소 검색</button>
                            </div>
                        </div>

                        <div className={"RegisterFormBtnGroup"}>
                            <div className={"RegisterFormSubmitBtn"}>
                                <button onClick={registerAction}>가입하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Register;
