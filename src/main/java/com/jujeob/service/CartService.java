package com.jujeob.service;

import com.jujeob.dto.CartDto;
import com.jujeob.entity.Cart;
import com.jujeob.repository.CartRepository;
import com.jujeob.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    public CartDto convertToDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setCartNo(cart.getCartNo());
        cartDto.setProductNo(cart.getProductNo());
        cartDto.setName(cart.getName());
        cartDto.setPrice(cart.getPrice());
        cartDto.setQuantity(cart.getQuantity());
        cartDto.setImg(cart.getProduct().getImg());

        return cartDto;
    }



}