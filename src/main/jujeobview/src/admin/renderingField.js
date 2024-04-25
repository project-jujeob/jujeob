import React from "react";

export const renderingFields = (selectedMainType) => {
    switch (selectedMainType) {
        case '1':
            return (
                <div>
                    {/*나중에 맥주 전용 값 생기면 추가하기*/}
                </div>
            );
        case
        '2'
        :
            return (
                <div className="TraditionalContainer">
                    <label htmlFor="company">회사 </label>
                    <input type="text" id="company" name="company"/>

                    <label htmlFor="packageType">포장 </label>
                    <input type="text" id="packageType" name="packageType"/>

                    <label htmlFor="unit">개수 </label>
                    <input type="text" id="unit" name="unit"/>

                    <label htmlFor="detailImg">상세이미지 </label>
                    <input type="file" id="detailImg" name="detailImg" accept="image/*"/>

                    <label htmlFor="tastingImg">테이스팅이미지 </label>
                    <input type="file" id="tastingImg" name="tastingImg"/>

                    <label htmlFor="colorAndHomogeneity">색&균질성 </label>
                    <input type="text" id="colorAndHomogeneity" name="colorAndHomogeneity"/>

                    <label htmlFor="incense">향 </label>
                    <input type="text" id="incense" name="incense"/>

                    <label htmlFor="tasting">맛 </label>
                    <input type="text" id="tasting" name="tasting"/>

                    <label htmlFor="mouthfeel">목넘김 </label>
                    <input type="text" id="mouthfeel" name="mouthfeel"/>

                    <label htmlFor="brandImg">상표 </label>
                    <input type="file" id="brandImg" name="brandImg"/>
                </div>
            );
        case '3':
            return (
                <div className="WineContainer">
                    <label htmlFor="company">회사 </label>
                    <input type="text" id="company" name="company"/>

                    <label htmlFor="tastingimg">테이스팅이미지 </label>
                    <input type="file" id="tastingimg" name="tastingimg"/>

                    <label htmlFor="winery">와이너리 </label>
                    <input type="text" id="winery" name="winery"/>

                    <label htmlFor="kind">포도종류 </label>
                    <input type="text" id="kind" name="kind"/>

                    <label htmlFor="color">색 </label>
                    <input type="text" id="color" name="color"/>

                    <label htmlFor="openType">오픈타입 </label>
                    <input type="text" id="openType" name="openType"/>

                    <label htmlFor="aroma">아로마 </label>
                    <input type="text" id="aroma" name="aroma"/>

                    <label htmlFor="foodPairing">푸드페어링 </label>
                    <input type="text" id="foodPairing" name="foodPairing"/>

                    <label htmlFor="breeding">브리딩 </label>
                    <input type="text" id="breeding" name="breeding"/>

                    <label htmlFor="recommendGlass">추천잔 </label>
                    <input type="text" id="recommendGlass" name="recommendGlass"/>

                    <label htmlFor="country">국가 </label>
                    <input type="text" id="country" name="country"/>

                    <label htmlFor="countryDescription">국가설명 </label>
                    <textarea id="countryDescription" name="countryDescription" rows="5"></textarea>
                </div>
            );
        case '4':
            return (
                <div>
                    <label htmlFor="company">회사 </label>
                    <input type="text" id="company" name="company"/>

                    <label htmlFor="tastingImg">테이스팅이미지 </label>
                    <input type="file" id="tastingImg" name="tastingImg"/>

                    <label htmlFor="aroma">아로마 </label>
                    <input type="text" id="aroma" name="aroma"/>

                    <label htmlFor="country">국가 </label>
                    <input type="text" id="country" name="country"/>

                    <label htmlFor="brand">브랜드 </label>
                    <input type="text" id="brand" name="brand"/>

                    <label htmlFor="crate">박스여부 </label>
                    <input type="text" id="crate" name="crate"/>

                    <label htmlFor="howToDrink">음용법 </label>
                    <input type="text" id="howToDrink" name="howToDrink"/>

                    <label htmlFor="flavor">플레이버 </label>
                    <input type="text" id="flavor" name="flavor"/>

                    <label htmlFor="finish">피니시 </label>
                    <input type="text" id="finish" name="finish"/>
                </div>

            );
    }
}