import React, {useRef} from 'react';

function DetailScrollToTarget({ contentTopRef, bottomRef, reviewRef }) {

    const scrollToContentTop = () => {
        if (contentTopRef.current) {
            contentTopRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    const scrollToReview = () => {
        if (reviewRef.current) {
            reviewRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    return (
        <div className="detailContentBtn">
            <div onClick={scrollToContentTop}>상품설명</div>
            <div onClick={scrollToBottom}>상세정보</div>
            <div onClick={scrollToReview}>후기</div>
            <div>상품문의</div>
        </div>
    );
}

export default DetailScrollToTarget;