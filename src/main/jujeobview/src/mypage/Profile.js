import './Profile.css'
import './PasswordCheckModal.css'
import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const [userData, setUserData] = useState(null);
    const [editable, setEditable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) return;
        axios.get('/api/user/profile', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('프로필 데이터 가져오기 오류:', error);
            });
    }, [accessToken]);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const verifyPassword = (e) => {
        e.preventDefault();
        axios.post('/api/user/verify-password', { password }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            .then(response => {
                setShowModal(false);
                setEditable(true);
                console.log('비밀번호가 일치합니다')
            })
            .catch(error => {
                alert('비밀번호가 일치하지 않습니다.');
                console.log('비밀번호가 일치하지 않습니다')
            });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        axios.patch('/api/user/profileUpdate', userData, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            .then(response => {
                alert('프로필이 성공적으로 업데이트 되었습니다.');
                setEditable(false);
            })
            .catch(error => {
                console.error('프로필 업데이트 오류:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className={"UserInfo"}>
            {userData && (
                <>
                <form onSubmit={handleProfileUpdate}>
                    <div className={"UserId"}>
                        <div className={"UserLabel"}><label htmlFor="userId">아이디</label></div>
                        <div className={"UserInput"}>
                            <input type="text" id="userId" name={"userId"} value={userData.userId} readOnly/>
                        </div>
                    </div>

                    <div className={"Nickname"}>
                        <div className={"UserLabel"}><label htmlFor="nickname">닉네임</label></div>
                        <div className={"UserInput"}>
                            <input type="text" id="nickname" name="nickname" value={userData.nickname} onChange={handleChange}
                                   readOnly={!editable}/>
                        </div>
                    </div>

                    <div className={"Name"}>
                        <div className={"UserLabel"}><label htmlFor="name">이름</label></div>
                        <div className={"UserInput"}>
                            <input type="text" id="name" name={"name"} defaultValue={userData.name} onChange={handleChange}
                                   readOnly={!editable}/>
                        </div>
                    </div>

                    <div className={"Email"}>
                        <div className={"UserLabel"}><label htmlFor="email">이메일</label></div>
                        <div className={"UserInput"}>
                            <input type="email" id="email" name={"email"} defaultValue={userData.email} onChange={handleChange}
                                   readOnly={!editable}/>
                        </div>
                    </div>

                    <div className={"Phone"}>
                        <div className={"UserLabel"}><label htmlFor="phone">전화번호</label></div>
                        <div className={"UserInput"}>
                            <input type="text" id="phone" name={"phone"} defaultValue={userData.phone} onChange={handleChange}
                                   readOnly={!editable}/>
                        </div>
                    </div>

                    <div className={"Address"}>
                        <div className={"UserLabel"}><label htmlFor="address">주소</label></div>
                        <div className={"UserInput"}>
                            <input type="text" id="address" name={"address"} defaultValue={userData.address} onChange={handleChange}
                                   readOnly={!editable}/>
                        </div>
                    </div>

                    <div className={"BtnGroup"}>
                        <div className={"SubmitBtn"}>
                            {!editable && (
                                <button type="button" onClick={handleEditClick}>프로필 편집</button>
                            )}
                        </div>
                        <div className={"SubmitBtn"}>
                            {editable && (
                                <button type="submit">변경 사항 저장</button>
                            )}
                        </div>
                    </div>
                </form>

                {showModal && (
                    <div className="ModalOverlay">
                        <div className="ModalContent">
                            <h2>비밀번호 확인</h2>
                            <form onSubmit={verifyPassword}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="비밀번호 입력"
                                    required
                                />
                                <button type="submit">확인</button>
                                <button type="button" onClick={() => setShowModal(false)}>취소</button>
                            </form>
                        </div>
                    </div>
                )}
                </>
            )}
        </div>
    );
}

export default Profile

function base64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
