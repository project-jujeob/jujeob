import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import '../BbsStyle/Reply.css';
import Loading from "../Comment/Loading";
import { CgProfile } from "react-icons/cg";
import {SlCheck, SlClose, SlOptions} from "react-icons/sl";
import DateAndTime from "../BoardComponent/DateAndTime";
import {useAuth} from "../../user/Context";
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


    const cancel = () => {
        setEditMode({ id: null, content: '' });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Loading />
            </div>
        );
    }
    const ReplyHandleEdit =(commentId, commentContent, userNo)=>{
        if (payload.userNo !== userNo) {
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
                            <div className="Choose">@{reply.parentNickname} </div>
                        </div>
                        <div className="Reply-AuthorAndContent">
                                <div className="Reply-ProfileImgAndAuthor">
                                    <div className="Reply-AuthorAndContent-ProfileImg"><CgProfile/></div>
                                    <div className="Reply-AuthorAndContent-Reply-Author">
                                        <div>{reply.nickname}</div>
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
                                                onClick={() =>
                                                    handleSave(reply.commentId, editMode.content, reply.userNo, 1)}><SlCheck/>
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
                                 onClick={() => openDeleteModal(reply.commentId, reply.userNo)}>삭제
                            </div>
                            <div className="Reply-Detail-Item Reply-Detail-Divide"></div>
                            <div className="Reply-Detail-Item Reply-Detail-UpdateButton"
                                 onClick={() => {
                                     ReplyHandleEdit(reply.commentId, reply.commentContent, reply.userNo)
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
