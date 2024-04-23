import "../../MainPage.css";
import "../BbsStyle/bbsList.css";
import Header from "../../common/Header";
import React, { useState, useEffect } from "react";
import BbsListItem from "../BoardComponent/BbsListItem";
import BbsCategory from "../BoardComponent/BbsCategory";
import BbsSlideAndBestPost from "../BoardComponent/BbsSlideAndBestPost";
import {useAuth} from "../../member/Context";

function BbsList() {
    const {payload} = useAuth();
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