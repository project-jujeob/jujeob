import React, {useState, useEffect} from 'react';
import './Login.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";
import {useAuth} from "./Context";


function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // 로그인 후 리다이렉트할 경로
    const { setAuthPayload, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true }); // 로그인 후 from 경로로 리다이렉트
        }
    }, [isLoggedIn, from, navigate]);

    const loginAction = () => {
        axios({
            method: "post",
            url: "/api/auth/login",
            data: JSON.stringify({ userId, password }),
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }). then((response) => {
            const { accessToken, refreshToken } = response.data;

            // 여기서 추가된 부분: 탈퇴된 계정이거나 없는 계정일 경우의 처리
            if (accessToken === 'Y') {
                alert('탈퇴된 계정입니다.');
                return;
            }

            // 저장할 때 구조 분해 할당을 사용하여 직접 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            alert("로그인 성공");

            setAuthPayload(response.data);

        }).catch(error => {
            alert("아이디 또는 비밀번호를 다시 확인해 주세요");
            console.log(error);
        });
    }

    // 구글
    // const handleGoogleButtonClick = () => {
    //     window.location.href = 'http://localhost:8080/oauth2/code/google';
    //     //window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    //     navigate('/')
    // }
    // // 네이버
    // const handleNaverButtonClick = () => {
    //     window.location.href = 'http://localhost:8080/login/oauth2/jujeob/naver';
    // }
    // // 카카오
    // const handleKakaoButtonClick = () => {
    //     window.location.href = 'http://localhost:8080/login/oauth2/jujeob/kakao';
    // }


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
                                // name={"memId"}
                                   name={"userId"}
                                // onChange={(e) => setMemId(e.target.value)}
                                   onChange={(e) => setUserId(e.target.value)}
                            /><br/>
                            <input type={"password"}
                                   placeholder={"비밀번호"}
                                // name={"memPw"}
                                   name={"password"}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button id={"LoginBtn"} onClick={loginAction}>로그인</button>
                    </div>


                    <div className="loginOptionsContainer">
                        <div className={"IdSave"}>
                            <input type={"checkbox"} id={"saveId"} name={"saveId"} value={"y"}/>
                            <label htmlFor="saveId" className={""}>아이디 저장</label>
                        </div>
                        {/*<p className="dn js_caution_msg1">아이디, 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</p>*/}

                        <div className="linkContainer">
                            <Link to="/find-id">아이디 찾기</Link>
                            <span className="divider">|</span>
                            <Link to="/find-password">비밀번호 찾기</Link>
                            <span className="divider">|</span>
                            <Link to="/register">회원가입</Link>
                        </div>
                    </div>



                    <br/>
                    <hr/>
                    <br/>

                    <div>
                        <Link to={"/AdultVerification"}>
                            <button>회원가입</button>
                        </Link>
                    </div>

                    {/*<div>*/}
                    {/*    <button onClick={handleGoogleButtonClick}>*/}
                    {/*        구글 로그인*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <button onClick={handleNaverButtonClick}>*/}
                    {/*        네이버 로그인*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <button onClick={handleKakaoButtonClick}>*/}
                    {/*        카카오 로그인*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>

    )
}

export default Login;