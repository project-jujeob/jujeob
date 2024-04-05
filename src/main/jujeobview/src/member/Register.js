import React, { useState } from 'react';
import './Register.css';
import axios from "axios";
import Header from "../common/Header";

function Register() {  //회원가입폼에 입력받을 데이터
    const [registerData, setRegisterData] = useState({
        memId: "",
        memPw: "",
        memNickname: "",
        memName: "",
        memPhone: "",
        memEmail: "",
        memAddr: ""
    });

    const registerDataChange = (e) => { //
        setRegisterData({ ...registerData, [e.target.name]: e.target.value})
    }
    const registerAction = (e) => {
        e.preventDefault();

        if (Object.values(registerData).some(value => !value)) {
            alert("입력 필드를 모두 채워주세요.");
            return; // 함수 종료
        }

        axios({
          method: "post",
          url: "/register.do",
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
        <div>
            <Header/>
            <div className={"RegisterPage"}>
                <div className={"RegisterForm"}>
                    <h1>회원가입</h1><br/>
                    <div className={"hr"}></div>
                    <br/>
                    <input type={"text"} placeholder={"아이디"} name={"memId"} onChange={registerDataChange} required={true}/><br/>
                    <input type={"password"} placeholder={"비밀번호"} name={"memPw"} onChange={registerDataChange}/><br/>
                    <input type={"password"} placeholder={"비밀번호 재입력"}/><br/>

                    <input type={"text"} placeholder={"닉네임"} name={"memNickname"} onChange={registerDataChange}/><br/>
                    <input type={"text"} placeholder={"이름"} name={"memName"} onChange={registerDataChange}/><br/>
                    <input type={"text"} placeholder={"전화번호"} name={"memPhone"} onChange={registerDataChange}/><br/>
                    <input type={"email"} placeholder={"jujeob@xxx.com"} name={"memEmail"} onChange={registerDataChange}/><br/>
                    <input type={"text"} placeholder={"주소"} name={"memAddr"} onChange={registerDataChange}/><br/>


                    <button onClick={registerAction}>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default Register;
