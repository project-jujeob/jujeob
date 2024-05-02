/*
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SlideArea({mostLikedProducts}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="SlideArea">
            {mostLikedProducts.length > 0 ? (
                <Slider {...settings}>
                    {mostLikedProducts.slice(0, 3).map((product, index) => (
                        <div key={index}>
                            <div style={{backgroundImage: `url(${product.img})`, width: '1%', height: '11px', backgroundSize: 'cover'}}>
                                <h3>{index + 1}위 상품</h3>
                                <p>상품명: {product.name}</p>
                                <p>가격: {product.price}</p>
                                {/!* 필요한 다른 데이터를 표시 *!/}
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>데이터를 불러오는 중...</p>
            )}
        </div>
    );
}

export default SlideArea;
*/
