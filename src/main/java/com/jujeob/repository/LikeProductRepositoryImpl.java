package com.jujeob.repository;

import com.jujeob.entity.QLikeProduct;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

@Log4j2
@Repository
@RequiredArgsConstructor
public class LikeProductRepositoryImpl implements LikeProductRepositoryCustom{
    private final JPAQueryFactory factory;

    @Override
    public Long getLikeCount(int productNo) {
        QLikeProduct qLikeProduct = QLikeProduct.likeProduct;
        return factory
                .select(qLikeProduct.count())
                .from(qLikeProduct)
                .where(qLikeProduct.productId.eq(productNo), qLikeProduct.likeStatus.eq("Y"))
                .fetchOne();
    }
}