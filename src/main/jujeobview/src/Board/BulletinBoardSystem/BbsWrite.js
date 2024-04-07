import React, { useState, useEffect } from 'react';
import '../BbsStyle/bbsWrite.css';
import Header from "../../common/Header";
function BbsWrite(props) {
    return(

        <div className="BbsWriteContainer">
            <Header/>
            <div className="WriteArea">
                <p> 제목 :<input type="text"></input></p>
                <p> 내용 : <input  className="context" type="text"></input></p>

            </div>
        </div>
    )
}

export default BbsWrite;