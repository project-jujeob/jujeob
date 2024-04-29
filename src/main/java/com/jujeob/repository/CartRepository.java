package com.jujeob.repository;

import com.jujeob.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findByUserNoAndProductNo(Long UserNo, Integer productNo);
    void removeByUserNoAndProductNo(Long UserNo, Integer productNo);


    void deleteByUserNoAndProductNoIn(Long UserNo, List<Long> productNos);


    void deleteAllByUserNoAndProductNoIn(Long userNo, List<Integer> productNos);


    List<Cart> findByUserNo(Long UserNo);
    //List<Cart> findAllByUserNoAndProductNo(Long UserNo, Integer productNo);


    // Custom method in CartRepository interface
//    @Modifying
//    @Query("DELETE FROM Cart c WHERE c.productNo IN :productNos AND c.UserNo = :userNo")
//    void removeByProductNosAndUserNo(@Param("productNos") List<Integer> productNos, @Param("userNo") Long userNo);


}