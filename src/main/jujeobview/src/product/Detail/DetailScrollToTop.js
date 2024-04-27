import React, { useState, useEffect } from 'react';
import arrow from '../../img/icon/arrowicon.png'

function DetailScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const scrollY = window.scrollY; // 현재 스크롤 위치

        // 스크롤 위치가 일정 이상이면 버튼을 나타내기
        if (scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 위로 가기 버튼 클릭 시 페이지 상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`scrollToTopButton ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop}>
            <img src={arrow} alt="화살표이미지"/>
        </div>
    );
}

export default DetailScrollToTop;
