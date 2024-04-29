import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import '../BbsStyle/Reply.css';
import Loading from "../Comment/Loading";
import { CgProfile } from "react-icons/cg";
import {SlCheck, SlClose, SlOptions} from "react-icons/sl";
import DateAndTime from "../BoardComponent/DateAndTime";
import {useAuth} from "../../member/Context";
function Reply({ handleSave, parentCommentId, triggerUpdate, toggleMenu, selectedCommentIdForMenu, openDeleteModal, setSelectedCommentIdForMenu }) {
    const { payload } = useAuth();
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState({ id: null, content: '' });
    const inputRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        const fetchReplies = async () => {
            try {
                const response = await fetch(`/boardComment/ReplyData/${parentCommentId}?sort=desc`);
                const data = await response.json();
                // Filter out replies with isDeleted === 0
                const filteredReplies = data.filter(reply => reply.isDeleted === 0);
                setReplies(filteredReplies.reverse());
                setLoading(false);
            } catch (error) {
                console.error("답글 데이터 가져오기 오류 : ", error);
                setLoading(false);
            }
        };

        if (parentCommentId !== null) {
            fetchReplies();
        }
    }, [parentCommentId, triggerUpdate]);

/*    const handleSave = (commentId, content) => {
        // 수정된 내용을 저장하는 로직을 여기에 구현합니다.
        // 예시: 수정된 내용을 저장하기 위해 API를 호출합니다.
        console.log(`댓글 ${commentId}에 대한 수정된 내용을 저장 중: ${content}`);
        // 저장 후, 편집 모드를 재설정합니다.
        setEditMode({ id: null, content: '' });
    };*/

    const cancel = () => {
        // Reset editMode when cancel is clicked
        setEditMode({ id: null, content: '' });
    };

    const formatRelativeTime = (timestamp) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);

        if (seconds < 60) {
            return "방금 전";
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes}분 전`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours}시간 전`;
        }
        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days}일 전`;
        }
        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months}달 전`;
        }
        const years = Math.floor(months / 12);
        return `${years}년 전`;
    };
    if (loading) {
        return (
            <div className="loading-container">
                <Loading />
            </div>
        );
    }
    const ReplyHandleEdit =(commentId, commentContent, memNo)=>{
        if (payload.memberNo !== memNo) {
            alert("자신의 댓글만 수정할 수 있습니다.");
            return;
        }
        setEditMode({ id: commentId, content: commentContent });
        setSelectedCommentIdForMenu(false);
    }

    return (
        <div className="Reply-List">
            {replies.map((reply, index) => (
                <div className="Reply-Detail" key={index}>
                    <div className="Reply-Header">
                        <div className="Reply-Date">
                            <DateAndTime createDate={reply.createDate}/>
                            <div className="Choose">@{reply.parentMemNickname} </div>
                        </div>
                        <div className="Reply-AuthorAndContent">
                                <div className="Reply-ProfileImgAndAuthor">
                                    <div className="Reply-AuthorAndContent-ProfileImg"><CgProfile/></div>
                                    <div className="Reply-AuthorAndContent-Reply-Author">
                                        <div>{reply.memNickname}</div>
                                    </div>
                                    <div className="Reply-Options">
                                        <div className="Reply-dropdown-toggle" onClick={() => toggleMenu(reply.commentId)}>
                                            <SlOptions/>
                                        </div>
                                    </div>
                                </div>
                                {editMode.id === reply.commentId ? (
                                    <div>
                                        <input
                                            className="Reply-UpdateComment"
                                            ref={inputRef}
                                            type="text"
                                            value={editMode.content}
                                            onChange={(e) => setEditMode({...editMode, content: e.target.value})}
                                            autoFocus
                                        />
                                        <button className="Reply-UpdateCancel" onClick={() => cancel()}><SlClose/></button>
                                        <button className="Reply-UpdateSubmit"
                                                onClick={() => handleSave(reply.commentId, editMode.content, reply.memNo, 1)}><SlCheck/>
                                        </button>
                                    </div>
                                ) :
                            <div className="Reply-Content">
                              {reply.commentContent}
                            </div>}
                        </div>
                    </div>
                    {selectedCommentIdForMenu === reply.commentId && (
                        <Modal
                            isOpen={true}
                            onRequestClose={() => setSelectedCommentIdForMenu(null)}
                            className={{
                                base: 'ModalContent',
                                afterOpen: 'ModalContent open',
                                beforeClose: 'ModalContent'
                            }}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                },
                                content: {
                                    width: '15%',
                                    height: '10%',
                                    margin: 'auto',
                                    textAlign: 'center',
                                    padding: '0',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }
                            }}
                        >
                            <div className="Reply-Detail-Item Reply-Detail-DeleteButton"
                                 onClick={() => openDeleteModal(reply.commentId, reply.memNo)}>삭제
                            </div>
                            <div className="Reply-Detail-Item Reply-Detail-Divide"></div>
                            <div className="Reply-Detail-Item Reply-Detail-UpdateButton"
                                 onClick={() => {
                                     ReplyHandleEdit(reply.commentId, reply.commentContent, reply.memNo)
                                     setSelectedCommentIdForMenu(null);
                                 }}>수정
                            </div>
                        </Modal>
                    )}

                </div>
            ))}
        </div>
    );
}

export default Reply;
