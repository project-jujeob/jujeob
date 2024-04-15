package com.jujeob.repository;

import com.jujeob.entity.Product;
import com.jujeob.entity.QProduct;
import com.jujeob.entity.QSubCategory;
import com.jujeob.entity.SubCategory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom{
    private final JPAQueryFactory factory;

    @Override
    public List<Product> findProductListByCategoryNameAndKeyword(String subCategoryName) {
        QProduct qProduct = QProduct.product;

        List<Product> products = factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.keyword.like("%" + subCategoryName + "%"))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByCategory(List<String> subCategories) {
        QProduct qProduct = QProduct.product;

        List<Product> products = new ArrayList<>();

        for (String  subCategory : subCategories) {
            List<Product> productList = factory.select(qProduct)
                    .from(qProduct)
                    .where(qProduct.keyword.like("%" + subCategory + "%"))
                    .fetch();

            products.addAll(productList);
        }

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<String> findProductId() {
        QProduct qProduct = QProduct.product;

        return factory
                .select(qProduct.productId)
                .from(qProduct)
                .distinct()
                .fetch();
    }

    @Override
    public List<String> findType(String mainType) {
        QProduct qProduct = QProduct.product;
        return factory
                .select(qProduct.type)
                .from(qProduct)
                .where(qProduct.productId.eq(mainType))
                .orderBy(qProduct.type.asc())
                .distinct().fetch();
    }

    @Override
    public List<Product> findProductListByMainType(String productId) {
        QProduct qProduct = QProduct.product;
        List<Product> products =  factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.eq(productId))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByType(String type) {
        QProduct qProduct = QProduct.product;
        List<Product> products= factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.type.eq(type))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByAlcohol(String alcohol) {
        QProduct qProduct = QProduct.product;
        BooleanBuilder builder = new BooleanBuilder();

        switch (alcohol) {
            case "level1":
                builder.and(qProduct.alcohol.goe(0).and(qProduct.alcohol.loe(5)));
                break;
            case "level2":
                builder.and(qProduct.alcohol.goe(6).and(qProduct.alcohol.loe(15)));
                break;
            case "level3":
                builder.and(qProduct.alcohol.goe(16).and(qProduct.alcohol.loe(30)));
                break;
            case "level4":
                builder.and(qProduct.alcohol.goe(31).and(qProduct.alcohol.loe(50)));
                break;
            case "level5":
                builder.and(qProduct.alcohol.gt(50));
                break;
            default:
                break;
        }
        // 쿼리 실행
        return factory.select(qProduct)
                .from(qProduct)
                .where(builder)
                .fetch();
    }

    @Override
    public List<Product> findProductListByPrice(String price) {
        QProduct qProduct = QProduct.product;
        BooleanBuilder builder = new BooleanBuilder();

        switch (price) {
            case "price1":
                builder.and(qProduct.price.goe(0).and(qProduct.price.lt(7000)));
                break;
            case "price2":
                builder.and(qProduct.price.goe(7000).and(qProduct.price.loe(30000)));
                break;
            case "price3":
                builder.and(qProduct.price.goe(30001).and(qProduct.price.loe(70000)));
                break;
            case "price4":
                builder.and(qProduct.price.goe(70001).and(qProduct.price.loe(100000)));
                break;
            case "price5":
                builder.and(qProduct.price.goe(100001).and(qProduct.price.loe(200000)));
                break;
            case "price6":
                builder.and(qProduct.price.gt(200000));
                break;
            default:
                break;
        }
        return factory.select(qProduct)
                .from(qProduct)
                .where(builder)
                .fetch();
    }
}
