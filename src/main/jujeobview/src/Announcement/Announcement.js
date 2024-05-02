import React, {useEffect, useState} from 'react';
import Header from "../common/Header";
import AnnouncementWrite from "../admin/AnnouncementWrite";
import axios from "axios";
import './Announcement.css';
import {useAuth} from "../user/Context";
import Pagination from "../common/Pagination";
import AnnouncementEdit from "../admin/AnnouncementEdit";

const PAGE_SIZE = 3;

const Announcement = () => {
    const { payload } = useAuth();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const [toggleStates, setToggleStates] = useState([]);
    const toggleContent = (index) => {
        const newContentToggleStates = [...toggleStates];
        newContentToggleStates[index] = !newContentToggleStates[index];
        setToggleStates(newContentToggleStates);
    }

    const [announcement, setAnnouncement] = useState([]);
    const [totalAnnouncement, setTotalAnnouncement] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = () => {
        axios.get('/api/AnnouncementList')
            .then((response) => {
                setAnnouncement(response.data);
                setTotalAnnouncement(response.data.length);
                setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));
                setToggleStates(Array(response.data.length).fill(false));
            }).catch((error) => {
            console.log('공지사항 목록 가져오기 실패:', error);
        });
    };
    // 새로운 공지사항 추가후 리스트 갱신하는 함수
    const onAnnouncementAdded = () => {
        fetchAnnouncements();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [editModal, setEditModal] = useState([false, 0]);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    const showEditModal = (announcement,index) => {
        setCurrentAnnouncement(announcement);
        setEditModal([true,index])
    };

    const closeEditModal = (num) => {
        setEditModal([false,num]);
    };


    const deleteAnnouncement = (announcementNo) => {
        axios.post('api/AnnouncementDelete', { announcementNo })
            .then((response) => {
                alert(announcementNo + "번 공지사항이 삭제되었습니다.");
                fetchAnnouncements();
            }).catch((error) => {
            console.log('공지사항 삭제 실패:', error);
        })
    }

    return (
        <>
            <Header/>
            <div className="AnnouncementContainer">
                <div className="AnnouncementHeader">
                    <h2 className="AnnouncementHeaderTitle">공지사항</h2>
                </div>
                {payload && payload.role === "ADMIN" && (
                    <div className="AnnouncementWrite">
                        <button onClick={toggleModal}>글 작성</button>
                    </div>
                )}
                {modal && (
                    <div className="modal">
                        <div className="modalContent">
                            <span className="modalClose" onClick={toggleModal}>&times;</span>
                            <AnnouncementWrite closeModal={toggleModal} onAnnouncementAdded={onAnnouncementAdded}/>
                        </div>
                    </div>
                )}
                <div className="AnnouncementList">
                    <div className="AnnouncementListHeader">
                        <div className="AnnouncementNo">NO.</div>
                        <div className="AnnouncementTitle" >제목</div>
                        <div className="AnnouncementWriter">작성자</div>
                        <div className="AnnouncementCreateAt">작성일</div>
                        {payload && payload.role === "ADMIN" && (
                            <div className="AnnouncementBtn"></div>
                        )}
                    </div>
                    {announcement.map((announcement, index) => (
                        <div className="AnnouncementListContentContainer" key={index}>
                            <div className="AnnouncementListContent1">
                                <div className="AnnouncementNo">{announcement.announcementNo}</div>
                                <div className="AnnouncementTitle" onClick={() => toggleContent(index)}>{announcement.announcementTitle}</div>
                                <div className="AnnouncementWriter">{announcement.announcementWriter}</div>
                                <div className="AnnouncementCreateAt">{formatDate(announcement.createdAt)}</div>
                                {payload && payload.role === "ADMIN" && (
                                    <div className="AnnouncementBtn">
                                        <button onClick={() =>  showEditModal(announcement,index)}>[수정]</button>
                                        {(editModal[0] && index === editModal[1]) ? (
                                            <div className="modal">
                                                <div className="modalContent">
                                                    <span className="modalClose" onClick={closeEditModal}>&times;</span>
                                                    <AnnouncementEdit
                                                        announcement={currentAnnouncement}
                                                        closeModal={closeEditModal}
                                                        onAnnouncementUpdated={fetchAnnouncements}
                                                    />
                                                </div>
                                            </div>
                                        ) : ""}
                                        <button onClick={() => deleteAnnouncement(announcement.announcementNo)}>[삭제]</button>
                                    </div>
                                )}

                            </div>
                            <div className="AnnouncementListContent2">
                                {toggleStates[index] && (
                                    <div className="AnnouncementContent">
                                        {announcement.announcementContent}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                totalItems={totalAnnouncement}
                itemsPerPage={PAGE_SIZE}
                pageCount={2}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Announcement;