package com.jujeob.repository;

import com.jujeob.entity.CartItemData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItemData,Long> {
    CartItemData findByMemberNoAndProductNo(Long memberNo, Integer productNo);
    void removeByMemberNoAndProductNo(Long memberNo, Integer productNo);

    void deleteByMemberNoAndProductNoIn(Long memberNo, List<Long> productNos);

}
