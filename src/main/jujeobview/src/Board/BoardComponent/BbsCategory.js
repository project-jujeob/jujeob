import "../../MainPage.css";
import "../BbsStyle/bbsCategory.css";
import React, { useState} from "react";
import BbsWrite from "../BoardModal/BbsWrite";
import {useAuth} from "../../user/Context";
function BbsCategory() {
    const {payload} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        if (!payload) {
            alert("로그인한 사용자만 가능합니다!");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="CategoriesNavContainer">
                <div className="Categories">
                    <div className="Category">자유게시판</div>
                    <div className="Category">주류게시판</div>
                    <div className="Category">모임게시판</div>
                </div>
                <div className="CategoryNewPost">
                        <div className="NewPostDiv"  onClick={() => openModal()}>글 작성하기</div>
                </div>
            </div>
            <div className="DetailNavContainer">
                <div className="DetailNavButtonArea">
                    <button className="DetailNavButton">카테고리</button>
                    <button className="DetailNavButton">정렬</button>
                    <button className="DetailNavButton">내 북마크 보기</button>
                </div>

            </div>

            <BbsWrite
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            />
        </div>


    );
}

export default BbsCategory;