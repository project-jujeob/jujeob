package com.jujeob.repository;

import com.jujeob.entity.LikeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeProductRepository extends JpaRepository<LikeProduct, Integer> {
    Optional<LikeProduct> findByMemberNoAndProductId(Long memberNo, Integer productId);
}
