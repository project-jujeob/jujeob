import React, {useEffect, useState} from 'react';
import Header from "../common/Header";
import axios from "axios";
import Pagination from "../common/Pagination";

const PAGE_SIZE = 10;

const UserInfo = () => {
    const [totalUserInfo, setTotalUserInfo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedSearchType, setSelectedSearchType] = useState('all');
    const [keyword, setKeyword] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/showUserInfo')
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
        axios.get('/api/admin/showUserInfo')
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

    const setSearchType = (value) => {
        setSelectedSearchType(value);
    };

    const setSearchKeyword = (value) => {
        setKeyword(value);
    };

    const handleSearch = () => {
        axios.post('/api/admin/userInfoBySearchOption',
            { selectedSearchType, keyword })
            .then((response) => {
                setUserInfo(response.data);
            }).catch((error) => {
            console.log('검색 회원 정보 가져오기 실패', error);
        });
    }

    return (
        <div>
            <div className="AdminUserInfoContainer">
                <div className="AdminUserInfoSearchContainer">
                    <div className="AdminUserInfoSearch">
                        <select onChange={e => setSearchType(e.target.value)}>
                            <option value="userId">아이디</option>
                            <option value="userName">이름</option>
                            <option value="nickname">닉네임</option>
                            <option value="phone">전화번호</option>
                        </select>
                        <input
                            type="text"
                            placeholder="검색어를 입력해주세요"
                            onChange={e => setSearchKeyword(e.target.value)}
                        />
                        <button onClick={handleSearch}>검 색</button>
                    </div>
                <div className="AdminUserInfoSearchCount">조회된 회원 수 : {userInfo.length}</div>
                </div>
                <div className="AdminUserInfoList">
                    <div className="AdminUserInfoListHeader">
                        <div className="AdminUserInfoNo">NO.</div>
                        <div className="AdminUserInfoId">아이디</div>
                        <div className="AdminUserInfoNickname">닉네임</div>
                        <div className="AdminUserInfoName">이름</div>
                        <div className="AdminUserInfoEmail">이메일</div>
                        <div className="AdminUserInfoPhone">전화번호</div>
                        <div className="AdminUserInfoAddr">주소</div>
                        <div className="AdminUserInfoCreateDate">가입일</div>
                        <div className="AdminUserDeleteStatus">탈퇴여부</div>
                    </div>
                    {userInfo.map((user, index) => (
                        <div className="AdminUserInfoListContent" key={index}>
                            <div className="AdminUserInfoNo">{index + 1}</div>
                            <div className="AdminUserInfoId">{user.userId}</div>
                            <div className="AdminUserInfoNickname">{user.nickname}</div>
                            <div className="AdminUserInfoName">{user.name}</div>
                            <div className="AdminUserInfoEmail" title={user.email}>{user.email}</div>
                            <div className="AdminUserInfoPhone" title={user.phone}>{user.phone}</div>
                            <div className="AdminUserInfoAddr" title={user.address}>{user.address}</div>
                            <div className="AdminUserInfoCreateDate">{formatDate(user.createDate)}</div>
                            <div className="AdminUserDeleteStatus">{user.deleted}</div>
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