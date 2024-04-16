import React, { useState } from 'react';
import './Register.css';
import axios from "axios";
import Header from "../common/Header";

function Register() {  //회원가입폼에 입력받을 데이터
    const [registerData, setRegisterData] = useState({
        memId: "",
        memPw: "",
        // memPwConfirm: "",
        memNickname: "",
        memName: "",
        memPhone: "",
        memEmail: "",
        memAddr: ""
    });

    // const [memPw, setMemPw] = useState('')
    // const [memPwConfirm, setMemPwConfirm] = useState('')

    const registerDataChange = (e) => { //
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }
    const registerAction = (e) => {
        e.preventDefault();

        if (Object.values(registerData).some(value => !value)) {
            alert("입력 필드를 모두 채워주세요.");
            return; // 함수 종료
        }

        axios({
          method: "post",
          url: "/api/register",
          data: JSON.stringify(registerData),
          headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            alert("성공");
            console.log(response.data);
            window.location.href = "/RegisterComplete";
        }).catch(error => {
            alert("실패");
            console.log(error);
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
                        <div className={"MemberId"}>
                            <div className={"MemberLabel"}><label htmlFor={"memId"}>아이디</label></div>
                            <div className={"MemberInput"}>
                                <input type={"text"} id={"memId"} placeholder={"아이디를 입력해주세요"} name={"memId"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                            <div>
                                <button>중복확인</button>
                            </div>
                        </div>

                        <div className={"MemberPw"}>
                            <div className={"MemberLabel"}><label htmlFor={"memPw"}>비밀번호</label></div>
                            <div className={"MemberInput"}>
                                <input type={"password"} id={"memPw"} placeholder={"비밀번호를 입력해주세요"} name={"memPw"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                            {/*{memPw && memPw.length < 10 && (*/}
                            {/*    <p>10자리 이상</p>*/}
                            {/*)}*/}
                            {/*{!/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{10,}/.test(memPw) && memPw.length >= 10 && (*/}
                            {/*    <p>영문/숫자/특수문자를 모두 포함해야 합니다</p>*/}
                            {/*)}*/}
                        </div>

                        <div className={"MemberPwConfirm"}>
                            <div className={"MemberLabel"}><label htmlFor={"memPwConfirm"}>비밀번호 확인</label></div>
                            <div className={"MemberInput"}>
                                <input type={"password"} id={"memPwConfirm"} placeholder={"비밀번호를 다시 입력해주세요"}
                                       name={"memPwConfirm"} onChange={registerDataChange} required={true}/><br/>
                            </div>
                            {/*{registerData.memPw && memPwConfirm && registerData.memPw !== memPwConfirm && (*/}
                            {/*    <p>동일한 비밀번호를 입력해주세요</p>*/}
                            {/*)}*/}
                        </div>

                        <div className={"MemberNickname"}>
                            <div className={"MemberLabel"}><label htmlFor={"memNickname"}>닉네임</label></div>
                            <div className={"MemberInput"}>
                                <input type={"text"} id={"memNickname"} placeholder={"닉네임을 입력해주세요"} name={"memNickname"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"MemberName"}>
                            <div className={"MemberLabel"}><label htmlFor={"memName"}>이름</label></div>
                            <div className={"MemberInput"}>
                                <input type={"text"} id={"memName"} placeholder={"이름을 입력해주세요"} name={"memName"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"MemberPhone"}>
                            <div className={"MemberLabel"}><label htmlFor={"memPhone"}>전화번호</label></div>
                            <div className={"MemberInput"}>
                                <input type={"text"} id={"memPhone"} placeholder={"숫자만 입력해주세요"} name={"memPhone"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"MemberEmail"}>
                            <div className={"MemberLabel"}><label htmlFor={"memEmail"}>이메일</label></div>
                            <div className={"MemberInput"}>
                                <input type={"email"} id={"memEmail"} placeholder={"예: jujeob@ssada.com"} name={"memEmail"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"MemberAddr"}>
                            <div className={"MemberLabel"}><label htmlFor={"memAddr"}>주소</label></div>
                            <div className={"MemberInput"}>
                                <input type={"text"} id={"memAddr"} placeholder={"주소를 입력해주세요"} name={"memAddr"}
                                       onChange={registerDataChange} required={true}/><br/>
                            </div>
                        </div>

                        <div className={"BtnGroup"}>
                            <div className={"SubmitBtn"}>
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
