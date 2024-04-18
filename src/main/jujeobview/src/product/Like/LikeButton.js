

import likeIcon from '../../img/icon/likeIcon.png'
import likeIconChecked from '../../img/icon/likeIconChecked.png'

const LikeButton = ({ isLiked, onClick }) => (
    <div className="ProductLikeBtn" onClick={onClick}>
        <img src={isLiked ? likeIconChecked : likeIcon} alt="Like Button"/>
    </div>
);

export default LikeButton;