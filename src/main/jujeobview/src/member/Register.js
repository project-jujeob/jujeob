import React from 'react';
import './Register.css';
function Register() {
    return(
        <div className={"RegisterPage"}>
            <div className={"RegisterForm"}>
                <h1>회원가입</h1><br/>
                <div className={"hr"}></div><br/>
                <input type={"text"} placeholder={"아이디"}/><br/>
                <input type={"password"} placeholder={"비밀번호"}/><br/>
                <input type={"password"} placeholder={"비밀번호 재입력"}/><br/>

                <input type={"text"} placeholder={"닉네임"}/><br/>
                <input type={"text"} placeholder={"이름"}/><br/>
                <input type={"text"} placeholder={"전화번호"}/><br/>
                <input type={"email"} placeholder={"jujeob@xxx.com"}/><br/>
                <input type={"text"} placeholder={"주소"}/><br/>

                <button>가입하기</button>


            </div>
        </div>
    )
}

export default Register