import main2 from "../img/main2.jpg";
import Header from "../common/Header";
import './info.css';

const Info = () => {

    return (
        <>
            <Header />
            <div className="MainContainer2">
                <div className="PageInfo">
                    <div className="pageInfoImg">
                        <img src={main2}/>
                    </div>
                    <div className="pageInfoText">
                        <p>
                            주접은 한국의 전통주부터 맥주, 와인, 위스키까지 다양한 술을 쉽게 접할 수 있도록 정보를 공유하고 구매할 수 있는 플랫폼입니다.
                        </p>
                        <p>
                            우리는 다양한 술에 대한 폭넓은 정보를 제공하며, 고객들이 원하는 제품을 구매할 수 있도록 다양한 상품을 제공합니다.
                        </p>
                        <p>
                            또한, 술을 사랑하는 이들을 위한 커뮤니티를 형성하여 함께 이야기를 나누고 소통할 수 있는 공간을 마련하였습니다.
                        </p>
                        <p>
                            우리의 목표는 술을 사랑하고 즐기는 이들이 모여 함께 좋은 시간을 보내며 다양한 술의 매력을 느낄 수 있도록 하는 것입니다.
                            함께 모여 술잔을 기울이며 즐거운 추억을 만들어보시길 바랍니다.
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Info;