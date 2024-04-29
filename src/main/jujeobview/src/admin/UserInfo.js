import React, {useEffect, useState} from 'react';
import Header from "../common/Header";
import axios from "axios";
import Pagination from "../common/Pagination";

const PAGE_SIZE = 5;

const UserInfo = () => {
    const [totalUserInfo, setTotalUserInfo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        axios.get('/api/showUserInfo')
            .then((response) => {
                setUserInfo(response.data);
                setTotalUserInfo(response.data.length);
                setTotalPages(Math.ceil(totalUserInfo / PAGE_SIZE));
            }).catch((error) => {
            console.log('회원 목록 가져오기 실패:', error);
        })
    }, []);

    useEffect(() => {
        loadUserInfoList();
    }, [currentPage]);

    const loadUserInfoList = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        axios.get('/api/showUserInfo')
            .then((response) => {
                setUserInfo(response.data.slice(startIndex, endIndex));
            })
            .catch((error) => {
                console.error('데이터 가져오기 실패:', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="UserInfoContainer">
                <div className="MemberInfoList">
                    <div className="userInfoListHeader">
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
                    {userInfo.map((user, index) => (
                        <div className="MemberInfoListContent" key={index}>
                            <div className="MemberInfoNo">{index + 1}</div>
                            <div className="MemberInfoId">{user.userId}</div>
                            <div className="MemberInfoNickname">{user.nickname}</div>
                            <div className="MemberInfoName">{user.name}</div>
                            <div className="MemberInfoEmail" title={user.email}>{user.email}</div>
                            <div className="MemberInfoPhone" title={user.phone}>{user.phone}</div>
                            <div className="MemberInfoAddr" title={user.address}>{user.address}</div>
                            <div className="MemberInfoCreateDate">{formatDate(user.createDate)}</div>
                            <div className="MemberDeleteStatus">{user.deleted}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                totalItems={totalUserInfo}
                itemsPerPage={PAGE_SIZE}
                pageCount={5}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserInfo;