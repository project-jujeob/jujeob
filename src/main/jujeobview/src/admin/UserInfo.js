import React, {useEffect, useState} from 'react';
import Header from "../common/Header";
import axios from "axios";

const UserInfo = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const [memberInfo, setMemberInfo] = useState([]);
    useEffect(() => {
        axios.get('/api/showUserInfo')
            .then((response) => {
                setMemberInfo(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log('회원 목록 가져오기 실패:', error);
        })
    }, []);

    return (
        <div>
            <div className="UserInfoContainer">
                <div className="MemberInfoList">
                    <div className="MemberInfoListHeader">
                        <div className="MemberInfoNo">NO.</div>
                        <div className="MemberInfoId">아이디</div>
                        <div className="MemberInfoNickname">닉네임</div>
                        <div className="MemberInfoName">이름</div>
                        <div className="MemberInfoEmail">이메일</div>
                        <div className="MemberInfoPhone">전화번호</div>
                        <div className="MemberInfoAddr">주소</div>
                        <div className="MemberInfoCreateDate">가입일</div>
                        <div className="MemberDeleteStatus">탈퇴여부</div>
                    </div>
                    {memberInfo.map((member, index) => (
                        <div className="MemberInfoListContent" key={index}>
                            <div className="MemberInfoNo">{index + 1}</div>
                            <div className="MemberInfoId">{member.memId}</div>
                            <div className="MemberInfoNickname">{member.memNickname}</div>
                            <div className="MemberInfoName">{member.memName}</div>
                            <div className="MemberInfoEmail">{member.memEmail}</div>
                            <div className="MemberInfoPhone">{member.memPhone}</div>
                            <div className="MemberInfoAddr">{member.memAddr}</div>
                            <div className="MemberInfoCreateDate">{formatDate(member.createDate)}</div>
                            <div className="MemberDeleteStatus">{member.memDeleted}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;