import "../../MainPage.css";
import "../BbsStyle/bbsCategory.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BbsCategory() {

    return (
        <div>
            <div className="CategoriesNavContainer">
                <div className="Categories">
                    <div className="Category">자유게시판</div>
                    <div className="Category">주류게시판</div>
                    <Link to={"/RandomCat"}>
                        <div className="Category">모임게시판</div>
                    </Link>
                </div>
                <div className="CategoryNewPost">
                    <Link to={"/BbsWrite"}>
                        <a>글 작성하기</a>
                    </Link>
                </div>
            </div>
            <div className="DetailNavContainer">
                <div className="DetailNavButtonArea">
                    {/*   구조가 애매해서 스타일만 줄 것임*/}
                    <button className="DetailNavButton">카테고리</button>
                    <button className="DetailNavButton">정렬</button>
                    <button className="DetailNavButton">내 북마크 보기</button>
                </div>

                <div className="DetailNavSearchArea">
                    {/*<img src={BoardImg} alt="돋보기"></img>*/}
                    <input type="text" placeholder="검색어를 입력하세요"></input>
                </div>
            </div>
        </div>
    );
}

export default BbsCategory;