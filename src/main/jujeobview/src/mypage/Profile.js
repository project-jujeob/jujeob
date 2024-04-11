import './Profile.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Profile() {

    const [profile, setProfile] = useState()

    const [memId, setMemId] = useState('')
    const [memPw, setMemPw] = useState('')
    const [memNickname, setMemNickname] = useState('')
    const [memName, setMemName] = useState('')
    const [memEmail, setMemEmail] = useState('')
    const [memPhone, setMemPhone] = useState('')
    const [memAddr, setMemAddr] = useState('')

    const changeMemId = (e) => { setMemId(e.target.value) }
    const changeMemPw = (e) => { setMemPw(e.target.value) }
    const changeMemNickname = (e) => { setMemNickname(e.target.value) }
    const changeMemName = (e) => { setMemName(e.target.value) }
    const changeMemEmail = (e) => { setMemEmail(e.target.value) }
    const changeMemPhone = (e) => { setMemPhone(e.target.value) }
    const changeMemAddr = (e) => { setMemAddr(e.target.value) }


    // 회원정보 조회
    useEffect(() => {
        axios.get('/api/showProfile')
            .then(response => {
                const { memId, memPw, memNickname, memName, memEmail, memPhone, memAddr } = response.data;
                setMemId(memId);
                setMemPw(memPw);
                setMemNickname(memNickname);
                setMemName(memName);
                setMemEmail(memEmail);
                setMemPhone(memPhone);
                setMemAddr(memAddr);
            })
            .catch(error => {
                console.error('Error fetching member profile:', error);
            });
    }, []);



    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     // 회원 정보 수정 로직 추가
    // }


    return(
        <form>
            <div className={"MemberInfo"}>
                <div>
                    <label htmlFor="memId">ID:</label>
                    <input type="text" id="memId" value={memId} onChange={changeMemId}/>
                </div>
                <div>
                    <label htmlFor="memPw">PW:</label>
                    <input type="password" id="memPw" value={memPw} onChange={changeMemPw}/>
                </div>
                <div>
                    <label htmlFor="memNickname">닉네임:</label>
                    <input type="text" id="memNickname" value={memNickname} onChange={changeMemNickname}/>
                </div>
                <div>
                    <label htmlFor="memName">이름:</label>
                    <input type="text" id="memName" value={memName} onChange={changeMemName}/>
                </div>
                <div>
                    <label htmlFor="memEmail">이메일:</label>
                    <input type="email" id="memEmail" value={memEmail} onChange={changeMemEmail}/>
                </div>
                <div>
                    <label htmlFor="memPhone">전화번호:</label>
                    <input type="text" id="memPhone" value={memPhone} onChange={changeMemPhone}/>
                </div>
                <div>
                    <label htmlFor="memAddr">주소:</label>
                    <input type="text" id="memAddr" value={memAddr} onChange={changeMemAddr}/>
                </div>
                <button type="submit">저장</button>
            </div>
        </form>
    )
}

export default Profile
