import React, {useState, useEffect} from 'react';
import './Login.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";


function Login() {
    const [memId, setMemId] = useState('');
    const [memPw, setMemPw] = useState('');


    const navigate = useNavigate();
    const location = useLocation();
    // location 객체에서 state 속성을 추출하고, 만약 state 속성이 존재하지 않으면 기본값으로 { from: { pathname: "/" } }
    const { from } = location.state || { from: { pathname: "/" } };


    const loginAction = () => {
        axios({
            method: "post",
            url: "/api/login",
            data: JSON.stringify({ memId, memPw }),
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }). then((response) => {
            alert("로그인 성공");
            console.log(response.data)
            localStorage.setItem('token', JSON.stringify(response.data)); // 로그인 정보를 로컬 스토리지에 저장
            // 이전 페이지로 리다이렉트
            navigate(-1)

        }).catch(error => {
            alert("로그인 실패");
            console.log(error);
        });
    }

    return (
        <div>
            <Header/>
            <div className={"LoginPage"}>
                <h2>로그인</h2>
                <div className={"LoginForm"}>
                    <h3>회원 로그인</h3>
                    <div className={"LoginBox"}>
                        <div className={"LoginInput"}>
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
                        <button id={"LoginBtn"} onClick={loginAction}>로그인</button>
                    </div>
                    <div>
                        <span className={"IdSave"}>
                            <input type={"checkbox"} id={"saveId"} name={"saveId"} value={"y"}/>
                            <label htmlFor="saveId" className={""}>아이디 저장</label>
                        </span>
                        {/*<p className="dn js_caution_msg1">아이디, 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</p>*/}
                    </div>


                    <br/>
                    <hr/>
                    <br/>

                    <div>
                        <Link to={"/RegisterAdult"}>
                            <button>회원가입</button>
                        </Link>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Login;