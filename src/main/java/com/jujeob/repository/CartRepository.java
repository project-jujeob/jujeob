package com.jujeob.repository;

import com.jujeob.entity.CartItemData;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItemData,Long> {
    CartItemData findByMemberNoAndProductNo(Long memberNo, Integer productNo);
    void removeByMemberNoAndProductNo(Long memberNo, Integer productNo);

    void deleteByMemberNoAndProductNoIn(Long memberNo, List<Long> productNos);
}
