import {useAuth} from "../user/Context";
import {useState} from "react";
import axios from "axios";
import '../../src/Announcement/Announcement.css';

const AnnouncementWrite = ({closeModal, onAnnouncementAdded}) => {
    const { payload } = useAuth();
    const [announcementContent, setAnnouncementContent] = useState("");
    const [announcementTitle, setAnnouncementTitle] = useState("");


    const handleAnnouncementContentChange = (event) => {
        setAnnouncementContent(event.target.value);
    };

    const handleAnnouncementTitleChange = (event) => {
        setAnnouncementTitle(event.target.value);
    };


    const handleAnnouncementSubmit = async () => {
        try {
            const response = await axios.post('/api/AnnouncementWrite', {
                announcementTitle: announcementTitle,
                // announcementWriter: payload.memberId,
                announcementWriter: payload.userId,
                announcementContent: announcementContent
            });
            if (response.status === 200 || response.status === 201) {
                alert("공지사항 등록이 완료되었습니다.");
                closeModal();
                onAnnouncementAdded();
            } else {
                console.error('공지사항 등록이 실패하였습니다.');
            }
        } catch (error) {
            console.error('요청 보내기 실패:', error);
        }
    };

    return(
        <>
            <div className="AnnouncementWriteContainer">
                <h4>공지사항 작성</h4>
                <div className="AnnouncementWriteTitle">
                    <div className="AT1">제목</div>
                    <div className="AT2">
                        <input type="text"
                               id="title"
                               placeholder="제목을 입력해주세요"
                               value={announcementTitle}
                               onChange={handleAnnouncementTitleChange}/>
                    </div>
                </div>
                <div className="AnnouncementWriteWriter">
                    <div className="AW1">작성자</div>
                    {/*<div className="AW2">{payload.memberId}</div>*/}
                    <div className="AW2">{payload.userId}</div>
                </div>
                <div className="AnnouncementWriteContent">
                    <div className="AnnouncementTextarea">
                        <div className="AC1">내용</div>
                        <div className="AC2">
                            <textarea placeholder="내용을 작성해주세요"
                                      value={announcementContent}
                                      onChange={handleAnnouncementContentChange}
                                      maxLength={700}
                                      rows={7} />
                        </div>
                    </div>
                    <div className="AnnouncementCharacterCount">
                        <span>{announcementContent.length}/700</span>
                    </div>
                    <div className="AnnouncementPrepareOrNot">
                        <div onClick={handleAnnouncementSubmit}>등록</div>
                        <div onClick={closeModal}>취소</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AnnouncementWrite;