import './MyPage.css';
function MyPage () {
    return (
        <div>
            <div className={"MyPage"}>
                <div className={"MyPageForm"}>
                    <div className={"MyPageTitleBox"}>
                        <h1>마이페이지</h1>
                    </div>
                    <div className={"MyPageSideBar"}>
                        <div><h3>주문 및 배송</h3></div>
                        <div><h3>구매 및 예약</h3></div>
                        <div><h3>찜 목록</h3></div>
                        <div><h3>리뷰 내역</h3></div>
                        <div><h3>내가 쓴 게시글</h3></div>
                        <div><h3>회원 정보 수정</h3></div>
                    </div>
                    {/*<div className={"MyPageDetail"}>*/}
                    {/*    <input>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>

    )
}

export default MyPage;