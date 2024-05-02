import React from "react";

function DateAndTime({createDate}){
    const formatRelativeTime = (timestamp) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);

        if (seconds < 60) {
            return "방금 전";
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes}분 전`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours}시간 전`;
        }
        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days}일 전`;
        }
        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months}달 전`;
        }
        const years = Math.floor(months / 12);
        return `${years}년 전`;
    };
    return (
        <>
            {formatRelativeTime(new Date(createDate))}
        </>
    );

}

export default DateAndTime