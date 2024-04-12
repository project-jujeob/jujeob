import "../../MainPage.css";
import "../BbsStyle/bbsList.css";
import Header from "../../common/Header";
import React, { useState, useEffect } from "react";
import BbsListItem from "../Component/BbsListItem";
import BbsCategory from "../Component/BbsCategory";
import BbsSlideAndBestPost from "../Component/BbsSlideAndBestPost";

function BbsList() {

    return (
        <div>
            <Header />
            <div className="BbsListContainer">
                <div className="SlideAndBestPost">
                    <BbsSlideAndBestPost />
                </div>

                <div className="NavContainer">
                   <BbsCategory />
                </div>
                <div className="BoardListItem">
                    <BbsListItem />
                </div>
            </div>
        </div>
    );
}

export default BbsList;