import {useAuth} from "../user/Context";
import {useEffect, useState} from "react";
import axios from "axios";
import './Admin.css';

const AnnouncementEdit = ({ announcement, closeModal, onAnnouncementUpdated }) => {
    const [editTitle, setEditTitle] = useState(announcement.announcementTitle);
    const [editContent, setEditContent] = useState(announcement.announcementContent);
    const { payload } = useAuth();

    useEffect(() => {
        if (announcement) {
            setEditTitle(announcement.announcementTitle);
            setEditContent(announcement.announcementContent);
        }
    }, [announcement]);

    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setEditContent(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/AnnouncementUpdate', {
                announcementNo: announcement.announcementNo,
                announcementWriter : payload.userId,
                // announcementWriter : payload.memberId,
                announcementWriter : payload.userId,
                announcementTitle: editTitle,
                announcementContent: editContent
            });
            if (response.status === 200) {
                alert("공지사항이 수정되었습니다.");
                closeModal();
                onAnnouncementUpdated();
            } else {
                console.error("공지사항 수정 실패");
            }
        } catch (error) {
            console.error("서버 에러:", error);
        }
    };

    return(
        <>
            <div className="AnnouncementEditContainer">
                <h4>공지사항 수정</h4>
                <div className="AnnouncementEditTitle">
                    <div className="AT1">제목</div>
                    <div className="AT2">
                        <input type="text" value={editTitle} onChange={handleTitleChange}/>
                    </div>
                </div>
                <div className="AnnouncementEditWriter">
                    <div className="AW1">작성자</div>
                    <div className="AW2">{payload.userId}</div>
                    {/*<div className="AW2">{payload.memberId}</div>*/}
                    <div className="AW2">{payload.userId}</div>
                </div>
                <div className="AnnouncementEditContent">
                    <div className="AnnouncementEditTextarea">
                        <div className="AC1">내용</div>
                        <div className="AC2">
                            <textarea value={editContent}
                                      onChange={handleContentChange}
                                      maxLength={700}
                                      rows={7}/>
                        </div>
                    </div>
                    <div className="AnnouncementCharacterCount">
                        <span>{editContent.length}/700</span>
                    </div>
                    <div className="AnnouncementEditOrNot">
                        <button className="EditBtn" onClick={handleSubmit}>수정 완료</button>
                        <button className="EditCancelBtn" onClick={closeModal}>취소</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AnnouncementEdit;