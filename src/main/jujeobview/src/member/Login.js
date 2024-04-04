import React, {useState} from 'react';
import './Login.css';
import {Link} from "react-router-dom";
import axios from "axios";

function Login() {
    const [memId, setMemId] = useState('');
    const [memPw, setMemPw] = useState('');
    const [loginMemberData, setLoginMemberData] = useState(null);
    // const [errorMessage, setErrorMessage] = useState('');

    const loginAction = () => {
        axios({
            method: "post",
            url: "/login.do",
            data: JSON.stringify({ memId, memPw }),
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }). then((response) => {
            alert("로그인 성공");
            setLoginMemberData(response.data);
            window.location.href = "/";
            console.log("로그인 성공한 회원 정보:", response.data);
        }).catch(error => {
            alert("로그인 실패");
            console.log(error);
        });
    }

    return (
        <div className="LoginPage">
            <h2>로그인</h2>
            <div className="LoginForm">
                <h3>회원 로그인</h3>
                <div className="LoginBox">
                    <div className="LoginInput">
                        <input type={"text"}
                               placeholder={"아이디"}
                               name={"memId"}
                               onChange={(e) => setMemId(e.target.value)}
                        /><br/>
                        <input type={"password"}
                               placeholder={"비밀번호"}
                               name={"memPw"}
                               onChange={(e) => setMemPw(e.target.value)}
                        />
                    </div>
                    <button id="LoginBtn" onClick={loginAction}>로그인</button>
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
