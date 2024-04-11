import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../common/Header";
import parse from 'html-react-parser';
import "../BbsStyle/bbsDetail.css";
function BbsDetail() {
    const {boardId} = useParams();
    const [board, setBoards] = useState(null);

    console.log("boardId:",boardId);

    useEffect(() => {
        if (boardId) {
            axios.get(`/board/Detail/${boardId}`)
                .then((response) => {
                    setBoards(response.data);
                })
                .catch((error) => {
                    console.error('데이터 가져오기 실패:', error);
                });
        }
    }, [boardId]);

    if (!board) {
        return <div>Loading...</div>;
    }
    return(
        <div>

            <div>
                <Header/>
            {/*     게시물 디테일 윗단      */}
                <div className="Board-Detail-Top-Container">
                    {/*작성자 프로필, 작성자 이름, '''표시*/}
                    <div className="Board-Detail-Profile">
                        <div className="Profile"><img alt="이미지"/></div>
                        <div className="Profile">작성자</div>
                        <div className="Profile Profile-Setting">편집점</div>
                    </div>
                    <div className="WidthDevide"></div>
                    {/*    본문 내용과 이미지     */}
                    <div className="Board-Detail-TitleAndContent">
                        <div className="TitleAndContent TitleAndContent-Title"><h3>{board.boardTitle}</h3></div>
                        <div className="TitleAndContent TitleAndContent-Content">{parse(
                            board.boardContent
                        )}</div>
                        <div className="TitleAndContent TitleAndContent-Img"><img alt="이미지"/></div>
                    </div>
                    {/* 작성 날짜와 조회 수 */}
                    <div className="Board-Detail-DateAndViews">
                        <div className="DateAndViews">{board.createDate}</div>
                        <div className="DateAndViews DateAndViews-Views">조회수: {board.boardViews}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BbsDetail;