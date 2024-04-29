package com.jujeob.repository;

import com.jujeob.entity.LikeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeProductRepository extends JpaRepository<LikeProduct, Integer>, LikeProductRepositoryCustom{
    //    Optional<LikeProduct> findByMemberNoAndProductId(Long memberNo, Integer productId);
//
//    List<LikeProduct> findAllByMemberNo(long memberNo);
    Optional<LikeProduct> findByUserNoAndProductId(Long userNo, Integer productId);

    List<LikeProduct> findAllByUserNo(long userNo);
}
