import axios from "axios";

const addToCart = (product,memberNo,cartQuantity) => {
    if (!product) {
        alert('추가할 상품이 없습니다.');
        return;
    }

    if (!memberNo) {
        alert('사용자 정보를 가져올 수 없습니다.');
        return;
    }

    // 일부 정보만 추출하여 저장
    const { productNo, name, price, img } = product;


    // 현재 로컬 스토리지에서 장바구니 정보를 가져옴
    const existingCart = localStorage.getItem(memberNo);

    // 만약 장바구니가 비어있으면 새로운 배열을 생성
    // 그렇지 않으면 기존 장바구니 정보를 가져옴
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    // 장바구니에 추가하려는 상품이 이미 장바구니에 있는지 확인
    const existingItemIndex = cartItems.findIndex(item => item.productNo === productNo);

    // 중복된 제품이 없으면 장바구니에 상품을 추가
    if (existingItemIndex === -1) {
        const newCart = { memberNo, productNo, name, price, img, quantity: cartQuantity};
        cartItems.push(newCart);
        alert('상품이 장바구니에 추가되었습니다.');
    } else {
        // 중복된 상품이 이미 장바구니에 있음을 알림
        alert('이미 장바구니에 있는 상품으로 1개를 추가합니다.');

        // 중복된 상품의 개수를 1개 늘림
        cartItems[existingItemIndex].quantity += 1;
    }

    // 수정된 장바구니 정보를 로컬 스토리지에 저장
    localStorage.setItem(memberNo, JSON.stringify(cartItems));

    // 서버에 데이터 전송
    axios.post('/api/addToCart', cartItems)
        .then(response => {
            alert(response.data.message); // 서버로부터의 응답 메시지를 처리
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });

    console.log("memberNo:",cartItems);
    /*axios.post('/api/addToCart', {
        cartItems: cartItems.map(item => ({
            memberNo: item.memberNo,
            productNo: item.productNo,
            name: item.name,
            price: item.price,
            img: item.img,

            quantity: item.quantity // 로컬 스토리지에서 가져온 개수 정보를 함께 전송

        }))
    })
        .then(response => {
            alert(response.data.message); // 서버로부터의 응답 메시지를 처리
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });*/
}
export default addToCart;