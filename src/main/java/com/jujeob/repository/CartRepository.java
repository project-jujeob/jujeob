package com.jujeob.repository;

import com.jujeob.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findByMemberNoAndProductNo(Long memberNo, Integer productNo);
    void removeByMemberNoAndProductNo(Long memberNo, Integer productNo);

    void deleteByMemberNoAndProductNoIn(Long memberNo, List<Long> productNos);

    List<Cart> findByMemberNo(Long memberNo);
}
