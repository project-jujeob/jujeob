package com.jujeob.controller;

import com.jujeob.entity.CartItemData;
import com.jujeob.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @PostMapping("/addToCart")
    //public String addToCart(@RequestBody CartItemData cartItemData) {
    public ResponseEntity<String> addToCart(@RequestBody List<CartItemData> cartItems) {
        System.out.println("카트내용뜨냐"+cartItems);

        cartRepository.saveAll(cartItems);
        return ResponseEntity.ok("장바구니에 상품이 추가되었습니다.");
    }
}