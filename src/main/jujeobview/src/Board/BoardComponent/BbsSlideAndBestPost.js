import "../../MainPage.css";
import "../BbsStyle/bbsSlideAndBestPost.css";
import React, { useState, useEffect } from "react";
function BbsSlideAndBestPost() {

    return (
        <div>
            <div className="SlideArea">이곳은 슬라이드</div>
            <div className="BestPostArea">이곳은 베스트글입니다.</div>
        </div>
    );
}

export default BbsSlideAndBestPost;