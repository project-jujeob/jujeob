// addToCart.js 파일

// 장바구니에 상품을 추가하는 함수
const addToCart = (product) => {
    // 현재 로컬 스토리지에서 장바구니 정보를 가져옵니다.
    const existingCart = localStorage.getItem('cart');

    // 만약 장바구니가 비어있으면 새로운 배열을 생성합니다.
    // 그렇지 않으면 기존 장바구니 정보를 가져옵니다.
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    // 장바구니에 상품을 추가합니다.
    cartItems.push(product);

    // 수정된 장바구니 정보를 로컬 스토리지에 저장합니다.
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

export default addToCart;
