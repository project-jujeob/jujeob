import { useState, useEffect } from 'react';
import axios from 'axios';

function useLikeCount(productNo) {
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        axios.get(`/api/getLikeCount?productNo=${productNo}`)
            .then(response => setLikeCount(response.data))
            .catch(error => console.error('좋아요 수 가지고 오기 실패', error));
    }, [productNo]);

    return likeCount;
}
export default useLikeCount;