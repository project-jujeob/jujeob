package com.jujeob.controller;

import com.jujeob.dto.CartDto;
import com.jujeob.entity.Cart;
import com.jujeob.repository.CartRepository;
import com.jujeob.repository.ProductRepository;
import com.jujeob.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartService cartService;

    @PostMapping("/addToCart")
    public ResponseEntity<String> addToCart(@RequestBody List<Cart> cartItems) {
        System.out.println("카트 내용: " + cartItems);

        // DB에 저장하기 전에 각 상품의 수량을 업데이트하거나 새로 추가합니다.
        for (Cart item : cartItems) {
            Cart existingItem = cartRepository.findByUserNoAndProductNo(item.getUserNo(), item.getProductNo());
            if (existingItem != null) {
                // 기존에 같은 상품이 있으면 수량을 더해줍니다.
                existingItem.setQuantity(item.getQuantity());
                cartRepository.save(existingItem);
            } else {
                // 새로운 상품이면 그대로 저장합니다.
                cartRepository.save(item);
            }
        }

        return ResponseEntity.ok("장바구니에 상품이 추가되었습니다.");
    }

    @GetMapping("/cartPageList/{userNo}")
    public List<CartDto> cartListUp(@PathVariable Long userNo){
        System.out.println("카트내용"+cartRepository.findByUserNo(userNo));

        List<Cart> carts = cartRepository.findByUserNo(userNo);
        List<CartDto> cartDtos = new ArrayList<>();

        for(Cart cart : carts){
            cartDtos.add(cartService.convertToDto(cart));
        }

        System.out.println("cartDtos:"+cartDtos);
        //return cartRepository.findAll();
        return cartDtos;
    }

    @Transactional
    @DeleteMapping("/cartDelete/{userNo}/{productNo}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long userNo, @PathVariable Integer productNo) {
        //cartRepository.deleteByProductNo(productNo); // 장바구니에서 상품 삭제 로직을 호출
        cartRepository.removeByUserNoAndProductNo(userNo,productNo);
        return ResponseEntity.ok("상품이 장바구니에서 삭제되었습니다.");
    }

    @Transactional
    @DeleteMapping("/cartDeleteSelected/{userNo}")
    public ResponseEntity<?> deleteSelectedProducts(@PathVariable Long userNo, @RequestBody Map<String, List<Long>> requestData) {
        System.out.println(requestData);
        List<Long> productNos = requestData.get("productNos");
        System.out.println("프로덕트넘버스"+productNos);
        try {
            cartRepository.deleteByUserNoAndProductNoIn(userNo, productNos);
            return ResponseEntity.ok("선택된 상품 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("선택된 상품 삭제 실패: " + e.getMessage());
        }
    }

    @PutMapping("/updateCartItemQuantity/{userNo}/{productNo}")
    public ResponseEntity<String> updateCartItemQuantity(@PathVariable Long userNo,
                                                         @PathVariable Integer productNo,
                                                         @RequestBody Cart cart) {
        /*// 클라이언트로부터 받은 데이터를 처리합니다.
        Long receivedUserNo = cart.getUserNo();
        Integer receivedProductNo = cart.getProductNo();
        Integer newQuantity = cart.getQuantity();

        // 여기서 받은 데이터를 이용하여 DB를 업데이트하는 작업을 수행합니다.
        // 예를 들어, 받은 회원 번호와 상품 번호를 사용하여 해당 상품의 수량을 업데이트합니다.

        return ResponseEntity.ok("수량이 업데이트되었습니다.");*/

        // 클라이언트로부터 받은 데이터
        int newQuantity = cart.getQuantity();

        // 해당 회원과 상품 번호를 가진 카트 아이템을 찾습니다.
        Cart existingItem = cartRepository.findByUserNoAndProductNo(userNo, productNo);

        if (existingItem != null) {
            // 찾은 카트 아이템의 수량을 업데이트합니다.
            existingItem.setQuantity(newQuantity);
            cartRepository.save(existingItem); // JPA를 사용하여 엔티티 를 저장하면 업데이트됩니다.
            return ResponseEntity.ok("상품 수량이 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 상품을 찾을 수 없습니다.");
        }
    }
}