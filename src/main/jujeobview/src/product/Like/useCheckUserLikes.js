import { useState, useEffect } from 'react';
import axios from 'axios';

const useCheckUserLikes = (memberNo) => {
    const [likes, setLikes] = useState({});

    useEffect(() => {
        if (memberNo) {
            const fetchUserLikes = async () => {
                try {
                    const response = await axios.post(`api/checkedUserLikes?memberNo=${memberNo}`);
                    const updatedLikes = response.data.reduce((acc, item) => {
                        acc[item.productId] = item.likeStatus === 'Y';
                        return acc;
                    }, {});
                    setLikes(updatedLikes);
                } catch (error) {
                    console.error('좋아요 목록 로딩 실패:', error);
                }
            };
            fetchUserLikes();
        }
    }, [memberNo]);

    return [likes, setLikes];
};

export default useCheckUserLikes;
