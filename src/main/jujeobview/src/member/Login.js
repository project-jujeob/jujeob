import React from 'react';
import './Login.css';
import {Link, Route, Routes} from "react-router-dom";

function Login() {


    return (
        <div className="LoginPage">
            <h2>로그인</h2>
            <div className="LoginForm">
                <h3>회원 로그인</h3>
                <div className="LoginBox">
                    <div className="LoginInput">
                        <input type={"text"} placeholder={"아이디"}/><br/>
                        <input type={"password"} placeholder={"비밀번호"}/>
                    </div>
                    <button id="LoginBtn">로그인</button>
                </div>
                <div>
                    <span className="IdSave">
                        <input type="checkbox" id="saveId" name="saveId" value="y"/>
                        <label htmlFor="saveId" className="">아이디 저장</label>
                    </span>
                    {/*<p className="dn js_caution_msg1">아이디, 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</p>*/}
                </div>


                <br/>
                <hr/>
                <br/>

                <div>
                    <Link to={"/Register"}>
                            <button>회원가입</button>
                    </Link>
                </div>



            </div>
        </div>
    )
}

export default Login;
