import React from "react";

export const renderingFields = (selectedMainType, productDetails, setProductDetails, handleFileChange,
                                selectedDetailImg, selectedTastingImg, selectedBrandImg) => {
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
                    <input type="text" id="company" name="company"
                           value={productDetails.company || ''}
                           onChange={(e) => setProductDetails({...productDetails, company: e.target.value})}/>

                    <label htmlFor="packageType">포장 </label>
                    <input type="text" id="packageType" name="packageType"
                           value={productDetails.packageType || ''}
                           onChange={(e) => setProductDetails({...productDetails, packageType: e.target.value})}/>

                    <label htmlFor="unit">개수 </label>
                    <input type="text" id="unit" name="unit"
                           value={productDetails.unit || ''}
                           onChange={(e) => setProductDetails({...productDetails, unit: e.target.value})}/>

                    <label htmlFor="detailImg">상세이미지</label>
                    <span>
                        {selectedDetailImg ? (
                            <img src={selectedDetailImg} alt="Detail Image" style={{width: '30%', height: '220px'}}/>
                        ) : productDetails.detailImg && (
                            <img src={productDetails.detailImg} alt="Detail Image"
                                 style={{width: '30%', height: '220px'}}/>
                        )}
                        <input type="file" id="detailImg" name="detailImg" accept="image/*"
                               onChange={handleFileChange}/>
                    </span>

                    <label htmlFor="tastingImg">테이스팅이미지</label>
                    <span>
                    {selectedTastingImg ? (
                        <img src={selectedTastingImg} alt="Tasting Image" style={{width: '50%', height: '250px'}}/>
                    ) : productDetails.tastingImg && (
                        <img src={productDetails.tastingImg} alt="Tasting Image"
                             style={{width: '50%', height: '250px'}}/>
                    )}
                        <input type="file" id="tastingImg" name="tastingImg" onChange={handleFileChange}/>
                    </span>

                    <label htmlFor="colorAndHomogeneity">색&균질성 </label>
                    <input type="text" id="colorAndHomogeneity" name="colorAndHomogeneity"
                           value={productDetails.colorAndHomogeneity || ''}
                           onChange={(e) => setProductDetails({
                               ...productDetails,
                               colorAndHomogeneity: e.target.value
                           })}/>

                    <label htmlFor="incense">향 </label>
                    <input type="text" id="incense" name="incense"
                           value={productDetails.incense || ''}
                           onChange={(e) => setProductDetails({...productDetails, incense: e.target.value})}/>

                    <label htmlFor="tasting">맛 </label>
                    <input type="text" id="tasting" name="tasting"
                           value={productDetails.tasting || ''}
                           onChange={(e) => setProductDetails({...productDetails, tasting: e.target.value})}/>

                    <label htmlFor="mouthfeel">목넘김 </label>
                    <input type="text" id="mouthfeel" name="mouthfeel"
                           value={productDetails.mouthfeel || ''}
                           onChange={(e) => setProductDetails({...productDetails, mouthfeel: e.target.value})}/>

                    <label htmlFor="brandImg">브랜드이미지 </label>
                    <span>
                    {selectedBrandImg ? (
                        <img src={selectedTastingImg} alt="brandImg" style={{width: '50%', height: '250px'}}/>
                    ) : productDetails.brandImg && (
                        <img src={productDetails.brandImg} alt="brandImg"
                             style={{width: '50%', height: '250px'}}/>
                    )}
                        <input type="file" id="brandImg" name="brandImg" onChange={handleFileChange}/>
                    </span>
                </div>
            );
        case '3':
            return (
                <div className="WineContainer">
                    <label htmlFor="company">회사 </label>
                    <input type="text" id="company" name="company"
                           value={productDetails.company || ''}
                           onChange={(e) => setProductDetails({...productDetails, company: e.target.value})}/>

                    <label htmlFor="tastingImg">테이스팅이미지</label>
                    <span>
                    {selectedTastingImg ? (
                        <img src={selectedTastingImg} alt="Tasting Image" style={{width: '50%', height: '250px'}}/>
                    ) : productDetails.tastingImg && (
                        <img src={productDetails.tastingImg} alt="Tasting Image"
                             style={{width: '50%', height: '250px'}}/>
                    )}
                        <input type="file" id="tastingImg" name="tastingImg" onChange={handleFileChange}/>
                    </span>

                    <label htmlFor="winery">와이너리 </label>
                    <input type="text" id="winery" name="winery"
                           value={productDetails.winery || ''}
                           onChange={(e) => setProductDetails({...productDetails, winery: e.target.value})}/>

                    <label htmlFor="kind">포도종류 </label>
                    <input type="text" id="kind" name="kind"
                           value={productDetails.kind || ''}
                           onChange={(e) => setProductDetails({...productDetails, kind: e.target.value})}/>

                    <label htmlFor="color">색 </label>
                    <input type="text" id="color" name="color"
                           value={productDetails.color || ''}
                           onChange={(e) => setProductDetails({...productDetails, color: e.target.value})}/>

                    <label htmlFor="openType">오픈타입 </label>
                    <input type="text" id="openType" name="openType"
                           value={productDetails.openType || ''}
                           onChange={(e) => setProductDetails({...productDetails, openType: e.target.value})}/>

                    <label htmlFor="aroma">아로마 </label>
                    <input type="text" id="aroma" name="aroma"
                           value={productDetails.aroma || ''}
                           onChange={(e) => setProductDetails({...productDetails, aroma: e.target.value})}/>

                    <label htmlFor="foodPairing">푸드페어링 </label>
                    <input type="text" id="foodPairing" name="foodPairing"
                           value={productDetails.foodPairing || ''}
                           onChange={(e) => setProductDetails({...productDetails, foodPairing: e.target.value})}/>

                    <label htmlFor="breeding">브리딩 </label>
                    <input type="text" id="breeding" name="breeding"
                           value={productDetails.breeding || ''}
                           onChange={(e) => setProductDetails({...productDetails, breeding: e.target.value})}/>

                    <label htmlFor="recommendGlass">추천잔 </label>
                    <input type="text" id="recommendGlass" name="recommendGlass"
                           value={productDetails.recommendGlass || ''}
                           onChange={(e) => setProductDetails({...productDetails, recommendGlass: e.target.value})}/>

                    <label htmlFor="country">국가 </label>
                    <input type="text" id="country" name="country"
                           value={productDetails.country || ''}
                           onChange={(e) => setProductDetails({...productDetails, country: e.target.value})}/>

                    <label htmlFor="countryDescription">국가설명 </label>
                    <textarea id="countryDescription" name="countryDescription" rows="5"
                              value={productDetails.countryDescription || ''}
                              onChange={(e) => setProductDetails({
                                  ...productDetails,
                                  countryDescription: e.target.value
                              })}></textarea>
                </div>
            );
        case '4':
            return (
                <div>
                    <label htmlFor="company">회사 </label>
                    <input type="text" id="company" name="company"
                           value={productDetails.company || ''}
                           onChange={(e) => setProductDetails({...productDetails, company: e.target.value})}/>

                    <label htmlFor="tastingImg">테이스팅이미지</label>
                    <span>
                    {selectedTastingImg ? (
                        <img src={selectedTastingImg} alt="Tasting Image" style={{width: '50%', height: '250px'}}/>
                    ) : productDetails.tastingImg && (
                        <img src={productDetails.tastingImg} alt="Tasting Image"
                             style={{width: '50%', height: '250px'}}/>
                    )}
                        <input type="file" id="tastingImg" name="tastingImg" onChange={handleFileChange}/>
                    </span>

                    <label htmlFor="aroma">아로마 </label>
                    <input type="text" id="aroma" name="aroma"
                           value={productDetails.aroma || ''}
                           onChange={(e) => setProductDetails({...productDetails, aroma: e.target.value})}/>

                    <label htmlFor="country">국가 </label>
                    <input type="text" id="country" name="country"
                           value={productDetails.country || ''}
                           onChange={(e) => setProductDetails({...productDetails, country: e.target.value})}/>

                    <label htmlFor="brand">브랜드 </label>
                    <input type="text" id="brand" name="brand"
                           value={productDetails.brand || ''}
                           onChange={(e) => setProductDetails({...productDetails, brand: e.target.value})}/>

                    <label htmlFor="crate">박스여부 </label>
                    <input type="text" id="crate" name="crate"
                           value={productDetails.crate || ''}
                           onChange={(e) => setProductDetails({...productDetails, crate: e.target.value})}/>

                    <label htmlFor="howToDrink">음용법 </label>
                    <input type="text" id="howToDrink" name="howToDrink"
                           value={productDetails.howToDrink || ''}
                           onChange={(e) => setProductDetails({...productDetails, howToDrink: e.target.value})}/>

                    <label htmlFor="flavor">플레이버 </label>
                    <input type="text" id="flavor" name="flavor"
                           value={productDetails.flavor || ''}
                           onChange={(e) => setProductDetails({...productDetails, flavor: e.target.value})}/>

                    <label htmlFor="finish">피니시 </label>
                    <input type="text" id="finish" name="finish"
                           value={productDetails.finish || ''}
                           onChange={(e) => setProductDetails({...productDetails, finish: e.target.value})}/>
                </div>

            );
    }
}