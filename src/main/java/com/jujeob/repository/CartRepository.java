package com.jujeob.repository;

import com.jujeob.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findByMemberNoAndProductNo(Long memberNo, Integer productNo);
    void removeByMemberNoAndProductNo(Long memberNo, Integer productNo);

    void deleteByMemberNoAndProductNoIn(Long memberNo, List<Long> productNos);


    void deleteAllByMemberNoAndProductNoIn(Long memberNo, List<Integer> productNos);

    List<Cart> findByMemberNo(Long memberNo);
    List<Cart> findAllByMemberNoAndProductNo(Long memberNo, Integer productNo);

    //void removeByProductNosAndMemberNo(List<Integer> productNos, Long memberNo);

    // Custom method in CartRepository interface
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.productNo IN :productNos AND c.memberNo = :memberNo")
    void removeByProductNosAndMemberNo(@Param("productNos") List<Integer> productNos, @Param("memberNo") Long memberNo);
}
